import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug'; // rehype-slugを追加
import { Toc } from '@/components/Toc'; // Tocコンポーネントを追加
import styles from './page.module.css';

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'docs/articles');
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      slug: fileName.replace(/\.md$/, ''),
    };
  });
}

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const options = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug], // rehype-slugを追加
    },
  };

  const { slug } = params;
  const postsDirectory = path.join(process.cwd(), 'docs/articles');
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContents);

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <h1 className={styles.title}>{data.title}</h1>
        <div className={styles.post}>
          <MDXRemote source={content} options={options} />
        </div>
      </div>
      <div className={styles.sidebar}>
        <Toc />
      </div>
    </div>
  );
}
