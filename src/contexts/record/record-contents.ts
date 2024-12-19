import path from 'node:path';
import { MDXContentFactory } from '@/shared/mdx';

const RECORD_DIR = path.join(process.cwd(), 'src', 'contexts', 'record', 'contents');

export const recordContents = MDXContentFactory.getInstance(RECORD_DIR);
