import type { UserPreferences } from "@freechess/shared";

/**
 * Capa de persistencia local con IndexedDB (modo invitado y offline).
 * - Store `kv`: preferencias del dispositivo.
 * - Store `outbox`: cola de cambios a sincronizar cuando haya sesión
 *   (skill de ingeniería de datos: ids deterministas, envío idempotente).
 * Sin dependencias: envoltorio mínimo sobre la API de IndexedDB.
 */

const DB_NAME = "freechess";
const DB_VERSION = 1;
const KV_STORE = "kv";
const OUTBOX_STORE = "outbox";
const PREFS_KEY = "preferences";

export type OutboxEntry = {
  id: string;
  type: "preferences";
  payload: UserPreferences;
  createdAt: number;
};

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB no está disponible en este entorno."));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(KV_STORE)) {
        db.createObjectStore(KV_STORE);
      }
      if (!db.objectStoreNames.contains(OUTBOX_STORE)) {
        db.createObjectStore(OUTBOX_STORE, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Error abriendo IndexedDB."));
  });
}

function requestToPromise<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Error en la operación."));
  });
}

async function withStore<T>(
  storeName: string,
  mode: IDBTransactionMode,
  fn: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  const db = await openDb();
  try {
    const tx = db.transaction(storeName, mode);
    return await requestToPromise(fn(tx.objectStore(storeName)));
  } finally {
    db.close();
  }
}

/* ------------------------------- Preferencias ------------------------------ */

export async function getLocalPreferences(): Promise<UserPreferences | null> {
  try {
    const value = await withStore<UserPreferences | undefined>(
      KV_STORE,
      "readonly",
      (store) => store.get(PREFS_KEY) as IDBRequest<UserPreferences | undefined>,
    );
    return value ?? null;
  } catch {
    // Sin IndexedDB (navegador privado, SSR): degradar sin romper.
    return null;
  }
}

export async function putLocalPreferences(prefs: UserPreferences): Promise<void> {
  try {
    await withStore(KV_STORE, "readwrite", (store) => store.put(prefs, PREFS_KEY));
  } catch {
    // Silenciar: la preferencia no se persiste, pero la app sigue funcionando.
  }
}

/* ---------------------------------- Outbox --------------------------------- */

export async function enqueueOutbox(entry: Omit<OutboxEntry, "id" | "createdAt">): Promise<void> {
  try {
    const record: OutboxEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    await withStore(OUTBOX_STORE, "readwrite", (store) => store.put(record));
  } catch {
    // Sin cola: el cambio quedará solo en este dispositivo.
  }
}

export async function listOutbox(): Promise<OutboxEntry[]> {
  try {
    return await withStore<OutboxEntry[]>(OUTBOX_STORE, "readonly", (store) =>
      store.getAll() as IDBRequest<OutboxEntry[]>,
    );
  } catch {
    return [];
  }
}

export async function clearOutbox(): Promise<void> {
  try {
    await withStore(OUTBOX_STORE, "readwrite", (store) => store.clear());
  } catch {
    // Nada que hacer.
  }
}

/** Borra todos los datos locales del dispositivo (con confirmación previa en UI). */
export async function clearAllLocalData(): Promise<void> {
  await clearOutbox().catch(() => undefined);
  try {
    await withStore(KV_STORE, "readwrite", (store) => store.clear());
  } catch {
    // Nada que hacer.
  }
}
