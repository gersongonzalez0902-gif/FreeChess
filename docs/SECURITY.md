# SECURITY — FreeChess

> Buenas prácticas de seguridad y privacidad aplicadas al proyecto.

## 1. Principios

1. Mínima recopilación de datos: email (solo si se registra) y nombre público
   opcional. Nada más.
2. Secretos SOLO en variables de entorno del servidor (Vercel); nada de
   claves en código, en el cliente ni en el historial de git.
3. Todo input del usuario se valida (zod en bordes de API/acciones);
   consultas siempre parametrizadas vía Drizzle (sin SQL concatenado).
4. Las funciones del motor corren en el navegador; el servidor nunca ejecuta
   Stockfish ni expone endpoints de análisis (menos superficie de ataque).

## 2. Autenticación y sesiones

- Better Auth: contraseñas con hash **Argon2id**, sesiones en base de datos
  con expiración y rotación, tokens de verificación de email y recuperación
  de cuenta de un solo uso con TTL corto.
- Cookies `httpOnly`, `secure` (producción), `sameSite=lax`.
- Protección contra enumeración de usuarios (mensajes genéricos en
  recuperación de contraseña).
- Límite de intentos de inicio de sesión por cuenta y por IP.
- Rate limiting en acciones sensibles: login, registro, recuperación,
  importación de PGN, exportaciones.

## 3. Autorización y control de acceso

- Cada consulta a datos de usuario filtra SIEMPRE por `user_id` de la sesión
  (patrón repositorio: sin confianza en ids que lleguen del cliente).
- Server Actions y rutas de API validan sesión antes de tocar la base.
- Subida de archivos: solo `.pgn`/texto, tamaño máximo (10 MB), validación
  de contenido antes de procesar; sin ejecución de nada subido.

## 4. Base de datos (Neon)

- `DATABASE_URL` solo presente en el servidor (nunca prefijo
  `NEXT_PUBLIC_`); el cliente se comunica con la base únicamente a través
  de rutas de servidor.
- Migraciones aplicadas con credenciales restringidas; credenciales de
  la app con mínimos permisos.
- Borrado en cascada desde `user` para cumplimiento del derecho de
  supresión (verificado con pruebas de integración).
- Backups lógicos del contenido del usuario: exportación PGN/JSON
  disponible en la interfaz.

## 5. Aplicación y transporte

- Cabeceras de seguridad (CSP, HSTS, X-Content-Type-Options,
  Referrer-Policy) configuradas en `next.config`.
- CSP estricta: sin `unsafe-inline` para scripts; el WASM del motor se
  carga desde `wasm-unsafe-eval` acotado a nuestros propios orígenes.
- Dependencias auditadas (`pnpm audit`) en cada fase; versiones fijadas
  (exact) para librerías críticas.
- Manejo de errores sin filtrar detalles internos al cliente; logs de
  servidor con contexto mínimo.

## 6. Privacidad del usuario

- Modo invitado sin registro: los datos viven SOLO en IndexedDB local.
- Cuenta eliminable desde Ajustes con confirmación explícita (escribir el
  nombre), borrando todo en una transacción.
- Sin rastreadores, sin analítica invasiva, sin publicidad.
- Los informes y partidas del usuario nunca son públicos salvo acción
  explícita del usuario (compartir un PGN exportado).

## 7. Reporte de vulnerabilidades

Canal: sección "Seguridad" del repositorio GitHub (Security Advisories).
Respuesta comprometida: acuse de recibo en 72 h. No hay recompensas
(bug bounty) por ahora; crédito público opcional al reportante.
