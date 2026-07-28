export function databaseProviderFromUrl(url: string): "sqlite" | "postgres" {
  if (url.startsWith("postgres://") || url.startsWith("postgresql://")) {
    return "postgres";
  }
  return "sqlite";
}
