import { defineField, defineType } from 'sanity';
import { PictureInPictureIcon } from 'lucide-react';

const mediaReference = defineType({
  name: 'mediaReference',
  type: 'object',
  title: 'Media Reference',
  icon: () => <PictureInPictureIcon color="currentColor" size={18} />,
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      options: { list: ['YouTube', 'Image', 'Link'] },
    }),
    defineField({ name: 'url', type: 'url', title: 'URL' }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
  ],
});

export { mediaReference };
