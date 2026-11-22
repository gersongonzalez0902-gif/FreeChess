import { useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Campo de formulario con etiqueta accesible, descripción y error.
 * El error se anuncia a lectores de pantalla con aria-describedby y
 * aria-invalid (skill de diseño: accesibilidad).
 */
type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string | null;
};

export function Field({ label, hint, error, className, id, ...props }: FieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-fg">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        className={cn(
          "h-11 w-full rounded-xl border bg-surface px-3.5 text-sm text-fg",
          "placeholder:text-muted/70",
          "transition-colors",
          error ? "border-danger" : "border-border hover:border-muted/60",
          className,
        )}
        {...props}
      />
      {hint && !error && (
        <p id={hintId} className="text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
