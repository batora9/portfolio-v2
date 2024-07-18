import { LinkCard } from '@/components/LinkCard';
import styles from './page.module.css';
import { SubHeader } from '@/components/SubHeader';
import { getMarkdowns } from "../../../utils/markdown";
import { Footer } from '@/components/Footer';
import { BreadCrumb } from '@/components/BreadCrumb';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '記事一覧',
  description:
    'ばとらの記事一覧ページです。技術記事や日記などを掲載しています。',
};

interface Post {
  slug: string;
  content: string;
  category?: string;
  frontmatter: {
      [key: string]: any;
  };
}

export default async function ArticlesPage() {
  const posts = await getMarkdowns('docs/articles');
  posts.sort((a, b) => a.frontmatter.updatedAt < b.frontmatter.updatedAt ? 1 : -1);
  return (
    <div className={styles.main}>
      <SubHeader />
      <div className={styles.container}>
        <BreadCrumb items={[{ to: '/', label: 'Home' }, { to: '/articles', label: '記事一覧' }]} />
        <h1>Articles</h1>
        <div className={styles.articlesList}>
          {posts.map((post: Post) => (
            <LinkCard
              key={post.slug}
              variant='article-link'
              href={`/articles/${post.slug}`}
              title={post.frontmatter.title}
              createdAt={post.frontmatter.createdAt}
              description={post.frontmatter.description}
              imageSrc={post.frontmatter.image}
              imageAlt={post.frontmatter.title}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}