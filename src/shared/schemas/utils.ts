export function emptyToUndefined(value: unknown) {
  if (value === null || (typeof value === 'string' && value.trim() === '')) {
    return undefined;
  }

  return value;
}
