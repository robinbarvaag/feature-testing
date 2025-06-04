import { sanityFetch } from '@repo/sanity';
import { CodeBlock } from '@repo/ui/components/code-block';
import ThemeEditor from '@repo/ui/theme-editor';

export default async function Page() {
  const content = await sanityFetch({
    query: `*[_type == "knowledgeEntry"][0]`,
    params: {},
  });

  return (
    <>
      <CodeBlock code={content.data.content[0].code.code} />
      {/* <ThemeEditor /> */}
    </>
  );
}
