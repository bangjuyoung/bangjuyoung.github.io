import path from 'path';

// @see https://nextjs.org/docs/app/api-reference/config/eslint#running-lint-on-staged-files
const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`;

const config = {
  '*.{js,jsx,mjs,ts,tsx,mts}': [buildEslintCommand, 'npm run format:fix'],
  '*.{json,md,css,html,yml,yaml,scss}': ['npm run format:fix'],
};

export default config;
