import { createAuthClient } from "better-auth/react";

/**
 * Cliente de Better Auth para componentes de React.
 * La URL base se infiere del origen de la página (mismo despliegue).
 */
export const authClient = createAuthClient();
