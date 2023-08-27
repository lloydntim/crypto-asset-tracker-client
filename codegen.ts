import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  documents: 'src/**/*.ts',
  hooks: {afterOneFileWrite: ['prettier --write']},
  generates: {
    'src/graphql/types.ts': {
      schema: 'http://localhost:3001/graphql',
      plugins: ['typescript'],
    },
    'src/hooks/graphql/index.ts': {
      schema: 'http://localhost:3001/graphql',
      // preset: 'near-operation-file',
      plugins: ['typescript', 'typescript-react-apollo'],
      config: {
        withHooks: true,
      },
      // presetConfig: {
      // extension: '.generated.ts',
      // baseTypesPath: 'src/graphql/types.ts',
      // folder: '../hooks/graphql',
      // },
    },
  },
};

export default config;
