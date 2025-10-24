export async function loadNotFoundMessage(locale: string) {
  return import(`/src/messages/${locale}.json`).then((messages) => messages.NOT_FOUND);
}
