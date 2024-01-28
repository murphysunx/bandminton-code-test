export function validatePlayerName(
  name: string,
  invalidNames: string[] = []
): boolean {
  return name.length > 0 && !invalidNames.includes(name);
}
