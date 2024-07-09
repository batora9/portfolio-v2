import './global.css'
import styles from './page.module.css'
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import { Metadata } from 'next';
import remarkGfm from 'remark-gfm';
// import remarkMath from 'remark-math';
// import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import { SubHeader } from '@/components/SubHeader';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

interface Props {
  params: { 
    work: string;
    slug: string
  };
  searchParams: {};
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'docs/articles');
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      slug: fileName.replace(/\.md$/, ''),
    };
  });
}

// ブログ記事ページ
export default async function ArticlePost( { params } : Props ) {
  const { slug } = params;
  // ファイルのパスを取得
  const filePath = path.join(process.cwd(), 'docs/articles', `${slug}.md`);

  // ファイルの中身を取得
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const title = data.title; // 記事のタイトル
  const createdAt = data.createdAt; // 記事の作成日
  const updatedAt = data.updatedAt; // 記事の更新日
  const createdAt_ja = new Date(createdAt).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
  const updatedAt_ja = new Date(updatedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });

  metadata.title = title; // ページのタイトルを記事のタイトルにする
  metadata.description = data.description; // ページのディスクリプションを記事のディスクリプションにする

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    // .use(remarkMath)
    .use(remarkHtml)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypePrettyCode)
    .use(rehypeStringify)
    .process(content);
  const contentHtml = processedContent.toString(); // マークダウンをHTMLに変換

  return (
      <div className={styles.main}>
        <SubHeader />
        <div className={styles.container}>
        <div>
          <p className={styles.title}>
            {title}
          </p>
          <p className={styles.date}>作成日 {createdAt_ja} / 最終更新日 {updatedAt_ja}</p>
        </div>
        <div
          id='markdown-body'
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
        </div>
        <Footer />
      </div>
  );
}