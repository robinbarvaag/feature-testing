export default {
  name: 'article',
  type: 'document',
  title: 'Article',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'content', type: 'text', title: 'Content' },
    { name: 'tags', type: 'array', of: [{ type: 'string' }], title: 'Tags' },
  ],
};
