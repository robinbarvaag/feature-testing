import { defineField, defineType } from 'sanity';
import { CodeBlockIcon } from '@sanity/icons';

const codeBlock = defineType({
  name: 'codeBlock',
  type: 'object',
  title: 'Code Block',
  icon: CodeBlockIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'A descriptive title for this code example',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'language',
      type: 'string',
      title: 'Programming Language',
      options: {
        list: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'React/JSX', value: 'jsx' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'Python', value: 'python' },
          { title: 'JSON', value: 'json' },
          { title: 'Bash', value: 'bash' },
        ],
      },
      initialValue: 'javascript',
    }),
    defineField({
      name: 'code',
      type: 'code',
      title: 'Code',
      description:
        'The actual code snippet with syntax highlighting and formatting',
      options: {
        theme: 'github', // eller 'github', 'tomorrow', 'kuroir', 'twilight', 'xcode', 'textmate'
        darkTheme: 'github',
        language: 'javascript',
        languageAlternatives: [
          { title: 'JavaScript', value: 'javascript', mode: 'javascript' },
          { title: 'TypeScript', value: 'typescript', mode: 'typescript' },
          { title: 'React/JSX', value: 'jsx', mode: 'jsx' },
          { title: 'HTML', value: 'html', mode: 'htmlmixed' },
          { title: 'CSS', value: 'css', mode: 'css' },
          { title: 'SCSS', value: 'scss', mode: 'sass' },
          { title: 'Python', value: 'python', mode: 'python' },
          { title: 'JSON', value: 'json', mode: 'javascript' },
          { title: 'Bash', value: 'bash', mode: 'shell' },
          { title: 'SQL', value: 'sql', mode: 'sql' },
          { title: 'PHP', value: 'php', mode: 'php' },
          { title: 'Go', value: 'go', mode: 'go' },
          { title: 'Rust', value: 'rust', mode: 'rust' },
        ],
        withFilename: true,
      },
    }),
    defineField({
      name: 'explanation',
      type: 'text',
      title: 'Explanation',
      description: 'A brief explanation of what this code does.',
      rows: 4,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'code.language',
      filename: 'code.filename',
    },
    prepare(selection) {
      const { title, language, filename } = selection;
      return {
        title: title || 'Untitled Code Block',
        subtitle: `${language || 'javascript'}${filename ? ` • ${filename}` : ''}`,
        media: CodeBlockIcon,
      };
    },
  },
});

export { codeBlock };
