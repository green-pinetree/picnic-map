module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'no-use-before-define': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelAttributes: ['htmlFor'],
      },
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react-hooks/exhaustive-deps': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/export': 'off',
    'import/extensions': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'off',
    // https://db2dev.tistory.com/entry/ESLint-importorder-%EA%B7%9C%EC%B9%99-%EC%84%A4%EC%A0%95%ED%95%98%EA%B3%A0-%EB%92%A4%EC%A3%BD%EB%B0%95%EC%A3%BD-import-%EC%BD%94%EB%93%9C-%EA%B0%9C%EC%84%A0%ED%95%98%EA%B8%B0
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', ['parent', 'sibling', 'index'], 'type', 'unknown'],
        pathGroups: [
          {
            pattern: 'angular',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '{next*,next*/**}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '{react*,react*/**}',
            group: 'external',
            position: 'before',
          },
          // 아래는 전부 스타일 관련 파일들을 unknown 그룹 하나로 묶어주는 역할을 한다.
          {
            pattern: '@pages/**/*.style',
            group: 'unknown',
          },
          {
            pattern: '@components/**/*.style',
            group: 'unknown',
          },
          {
            pattern: './**/*.style',
            group: 'unknown',
          },
          {
            pattern: '../**/*.style',
            group: 'unknown',
          },
          {
            pattern: '*.style',
            group: 'unknown',
          },
        ],
        pathGroupsExcludedImportTypes: ['react', 'unknown'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'never',
      },
    ],
  },
};
