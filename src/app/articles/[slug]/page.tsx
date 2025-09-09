import "./global.css";
import React from "react";
import styles from "./page.module.css";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import { Metadata } from "next";
import remarkGfm from "remark-gfm";
import rehypeReact from "rehype-react";
import rehypePrettyCode from "rehype-pretty-code";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import { BreadCrumb } from "@/components/BreadCrumb";
import { SubHeader } from "@/components/SubHeader";
import { Footer } from "@/components/Footer";
import { Paragraph } from "../../../../utils/Paragraph";
import { jsx, jsxs } from "react/jsx-runtime";

interface Props {
  params: {
    work: string;
    slug: string;
  };
  searchParams: {};
}

// 動的メタデータ生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    // ファイルのパスを取得
    const filePath = path.join(process.cwd(), "docs/articles", `${slug}.md`);
    
    // ファイルの中身を取得
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    
    const title = data.title || 'Untitled';
    const description = data.description || 'ブログ記事';
    const createdAt = data.createdAt;
    
    // OGP画像のURL生成（スラッグベース）
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NODE_ENV === 'production'
      ? 'https://batora.dev'
      : 'http://localhost:3000';
    
    // 記事のメタデータをURLパラメータとして渡す
    const ogImageUrl = `${baseUrl}/api/ogp/${slug}.png`;

    return {
      title,
      description,
      icons: [{ rel: "icon", url: "/favicon.ico" }],
      openGraph: {
        title,
        description,
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: title,
          }
        ],
        type: 'article',
        publishedTime: createdAt,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [ogImageUrl],
      },
    };
  } catch (error) {
    console.error('メタデータ生成エラー:', error);
    return {
      title: 'ブログ記事',
      description: 'batora.devのブログ記事',
      icons: [{ rel: "icon", url: "/favicon.ico" }],
    };
  }
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
export default async function ArticlePost({ params }: Props) {
  const { slug } = await params;
  // ファイルのパスを取得
  const filePath = path.join(process.cwd(), "docs/articles", `${slug}.md`);

  // ファイルの中身を取得
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const title = data.title; // 記事のタイトル
  const createdAt = data.createdAt; // 記事の作成日
  const updatedAt = data.updatedAt; // 記事の更新日
  const createdAt_ja = new Date(createdAt).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const updatedAt_ja = new Date(updatedAt).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    // .use(remarkMath)
    .use(remarkHtml)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypePrettyCode)
    .use(rehypeReact, {
      jsx,
      jsxs,
      Fragment: React.Fragment,
      createElement: React.createElement,
      components: {
        p: Paragraph,
      },
    } as any)
    .process(content);
  const contentHtml = processedContent.result;
  return (
    <div className={styles.main}>
      <SubHeader />
      <div className={styles.container}>
        <BreadCrumb
          items={[
            { to: "/", label: "Home", style: "node" },
            { to: "/articles", label: "記事一覧", style: "node" },
            { to: `/articles/${slug}`, label: title, style: "leaf" },
          ]}
        />
        <p className={styles.title}>{title}</p>
        <p className={styles.date}>
          作成日 {createdAt_ja} / 最終更新日 {updatedAt_ja}
        </p>
        <div id="markdown-body">{contentHtml}</div>
      </div>
      <Footer />
    </div>
  );
}
