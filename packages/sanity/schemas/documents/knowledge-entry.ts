import { orderRankField } from '@sanity/orderable-document-list';
import { defineField, defineArrayMember, defineType } from 'sanity';
import { richTextBlock } from '../definitions/rich-text';

const knowledgeEntry = defineType({
  name: 'knowledgeEntry',
  type: 'document',
  title: 'Knowledge Entry',
  fields: [
    orderRankField({ type: 'blog' }),
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        defineArrayMember({ type: 'codeBlock' }),
        defineArrayMember({ type: 'mediaReference' }),
      ],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'Tags',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
    prepare({ title, description }) {
      return {
        title,
        subtitle: description
          ? description.substring(0, 50) + '...'
          : 'No description',
      };
    },
  },
});

const knowledgeEntryIndex = defineType({
  name: 'knowledgeEntryIndex',
  type: 'document',
  title: 'Knowledge Entry Index',
  description: 'A collection of knowledge entries for easy navigation.',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'The title of the knowledge entry index.',
    }),
    defineField({
      name: 'featuredEntries',
      type: 'array',
      title: 'Featured knowledge entries',
      of: [{ type: 'reference', to: [{ type: 'knowledgeEntry' }] }],
      description: 'Select knowledge entries to feature in this index.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      entries: 'entries.length',
    },
    prepare({ title, entries }) {
      return {
        title: title || 'Untitled Knowledge Entry Index',
        subtitle: `${entries} entries`,
      };
    },
  },
});

export { knowledgeEntry, knowledgeEntryIndex };
