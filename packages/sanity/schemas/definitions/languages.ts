import { defineField } from 'sanity';

export const programmingLanguages = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C#',
  'Go',
  'Rust',
  'Ruby',
  'PHP',
  'Swift',
];

const programmingLanguagesBlock = defineField({
  name: 'language',
  type: 'string',
  title: 'Programming Language',
  description: 'Select the programming language for the code snippet.',
  options: {
    list: programmingLanguages.map((lang) => ({ title: lang, value: lang })),
  },
});

export { programmingLanguagesBlock };
