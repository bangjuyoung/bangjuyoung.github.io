import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type DefaultMDXMetadataProps = { [key: string]: string };

export interface IMDXContent<TMetadata = DefaultMDXMetadataProps> {
  slug: string;
  metadata: TMetadata;
  content: string;
}

export class MDXContentManager<TMetadata = DefaultMDXMetadataProps> {
  private readonly dir: string;
  private readonly contents: IMDXContent<TMetadata>[];

  constructor(dir: string) {
    this.dir = dir;
    this.contents = this.loadContents();
  }

  private getFiles() {
    return fs.readdirSync(this.dir).filter((file) => path.extname(file) === '.mdx');
  }

  private readFileContent(file: string) {
    return fs.readFileSync(path.join(this.dir, file), 'utf-8');
  }

  private parseContent(source: string) {
    const { data, content } = matter(source);

    return { metadata: data as TMetadata, content };
  }

  private loadContents() {
    return this.getFiles().map((file) => {
      const source = this.readFileContent(file);

      const { metadata, content } = this.parseContent(source);
      const slug = path.basename(file, path.extname(file));

      return { slug, metadata, content };
    });
  }

  public getAll() {
    return this.contents;
  }

  public getBySlug(slug: string) {
    return this.contents.find((entry) => entry.slug === slug);
  }
}
