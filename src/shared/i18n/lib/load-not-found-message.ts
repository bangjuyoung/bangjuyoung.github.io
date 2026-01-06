export async function loadNotFoundMessage(locale: string) {
  return import(`../../../messages/${locale}.json`).then((messages) => messages.NOT_FOUND);
}
