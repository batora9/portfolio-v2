import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import { Metadata } from "next";
import remarkGfm from 'remark-gfm';
// import remarkMath from 'remark-math';
// import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';

export const metadata: Metadata = {
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

interface Props {
  params: { 
    work: string;
    slug: string
  };
  searchParams: {};
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "docs/articles");
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      slug: fileName.replace(/\.md$/, ""),
    };
  });
}

// ブログ記事ページ
export default async function WorkPost( { params } : Props ) {
  const { slug } = params;
  // ファイルのパスを取得
  const filePath = path.join(process.cwd(), "docs/articles", `${slug}.md`);

  // ファイルの中身を取得
  const fileContents = fs.readFileSync(filePath, "utf8");
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
    <div className="flex bg-black flex-col min-h-screen">
      <div className="bg-black px-6 py-12 pb-16 pt-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-white">
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </p>
          <p className="mt-2 text-sm text-gray-400">作成日 {createdAt_ja} / 最終更新日 {updatedAt_ja}</p>
        </div>
        <div
          className="prose prose-lg text-white mx-auto max-w-3xl mt-8"
          id='markdown-body'
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </div>
  );
}