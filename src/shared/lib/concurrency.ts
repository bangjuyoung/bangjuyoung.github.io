export async function mapWithConcurrency<TItem, TResult>(
  items: TItem[] = [],
  concurrency: number,
  worker: (item: TItem, i: number) => Promise<TResult>,
) {
  if (concurrency <= 0) {
    throw new Error('Limit must be greater than 0');
  }

  const results: TResult[] = new Array(items.length);
  let i = 0;

  async function run() {
    while (true) {
      const current = i++;
      if (current >= items.length) {
        break;
      }
      results[current] = await worker(items[current], current);
    }
  }

  const runners = Array.from({ length: Math.min(concurrency, items.length) }, run);
  await Promise.all(runners);

  return results;
}
