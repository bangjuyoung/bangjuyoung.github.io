const config = {
  '*.{js,jsx,mjs,ts,tsx,mts}': ['npm run lint:fix --', 'npm run format:fix --'],
  '*.{json,md,css,html,yml,yaml,scss}': ['npm run format:fix --'],
};

export default config;
