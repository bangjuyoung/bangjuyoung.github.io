import { DefaultMDXMetadataProps, MDXContentManager } from './mdx-content-manager';

export class MDXContentFactory {
  static #instances = new Map<string, MDXContentManager>();

  static getInstance<TMetadata extends DefaultMDXMetadataProps>(dir: string) {
    if (!this.#instances.has(dir)) {
      const instance = new MDXContentManager<TMetadata>(dir);
      this.#instances.set(dir, instance);
    }

    return this.#instances.get(dir)! as MDXContentManager<TMetadata>;
  }
}
