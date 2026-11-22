"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Lectura/escritura de un valor en localStorage como almacén externo de
 * React (useSyncExternalStore): sin setState en efectos (regla
 * react-hooks/set-state-in-effect) e hidratación segura (en el servidor se
 * usa el valor de reserva).
 */

const EVENT = "freechess:local-storage";

function subscribe(callback: () => void): () => void {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function useLocalStorageValue<T>(
  key: string,
  opts: {
    fallback: T;
    parse: (raw: string | null) => T;
    serialize: (value: T) => string;
  },
): [T, (value: T) => void] {
  const { fallback, parse, serialize } = opts;

  const value = useSyncExternalStore(
    subscribe,
    () => parse(safeGet(key)),
    () => fallback,
  );

  const setValue = useCallback(
    (next: T) => {
      try {
        window.localStorage.setItem(key, serialize(next));
      } catch {
        // Sin acceso a localStorage: el cambio no se recuerda.
      }
      window.dispatchEvent(new Event(EVENT));
    },
    [key, serialize],
  );

  return [value, setValue];
}
