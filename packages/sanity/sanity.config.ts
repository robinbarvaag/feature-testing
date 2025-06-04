'use client';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { structure } from './structure';
import { codeInput } from '@sanity/code-input';
import schemas from './schemas';

export default defineConfig({
  basePath: '/studio',
  projectId: 'sds6d0u5',
  dataset: 'production',
  title: 'Personal Knowledge Platform',
  plugins: [structureTool({ structure }), codeInput()],
  schema: {
    types: schemas,
  },
});
