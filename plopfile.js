export default (plop) => {
  plop.setGenerator('component', {
    description: 'Create a reusable component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
      {
        name: 'component_type',
        type: 'list',
        message: 'Choose your component:',
        choices: ['Layout', 'Component'],
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{lowerCase component_type}}s/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile:
          'plop-templates/{{component_type}}/{{component_type}}.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/{{lowerCase component_type}}s/{{pascalCase name}}/{{pascalCase name}}.spec.tsx',
        templateFile:
          'plop-templates/{{component_type}}/{{component_type}}.spec.tsx.hbs',
      },
      {
        type: 'append',
        path: 'src/{{lowerCase component_type}}s/index.tsx',
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{pascalCase name}} from './{{pascalCase name}}/{{pascalCase name}}';`,
      },
      {
        type: 'append',
        path: 'src/{{lowerCase component_type}}s/index.tsx',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `{{pascalCase name}},`,
      },
    ],
  });
};
