/**
 * Renders a `{placeholder}` template. Dictionary entries are plain strings so
 * they can cross the server → client boundary; dynamic values are injected
 * at render time instead of shipping functions.
 *
 * Kept in its own module so Vitest and client bundles can import it without
 * pulling in the whole `@/i18n` barrel.
 */
export function format(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? `{${key}}`);
}
