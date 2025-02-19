module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:storybook/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'prettier',
    'plugin:jsx-a11y/strict',
    'plugin:eslint-plugin-jsx-a11y-check/strict-legacy',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort', 'jsx-a11y'],
  rules: {
    'prettier/prettier': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    // 'jsx-a11y/alt-text': 2,
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-nocheck': 'allow-with-description',
      },
    ],
  },
};
