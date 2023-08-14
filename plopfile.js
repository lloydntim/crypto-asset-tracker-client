export default (plop) => {
  plop.setGenerator('component', {
    description: 'Create a reusable component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/Component/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.spec.tsx',
        templateFile: 'plop-templates/Component/Component.spec.tsx.hbs',
      },
      {
        type: 'append',
        path: 'src/components/index.tsx',
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{pascalCase name}} from './{{pascalCase name}}/{{pascalCase name}}';`,
      },
      {
        type: 'append',
        path: 'src/components/index.tsx',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `{{pascalCase name}},`,
      },
    ],
  });
};
