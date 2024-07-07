import { LinkCard } from '@/components/LinkCard';
import styles from './page.module.css';
import { SubHeader } from '@/components/SubHeader';
import { getMarkdowns } from "../../../utils/markdown";
import { Footer } from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '開発一覧',
  description:
    'ばとらの開発一覧ページです。いままでに開発したものを掲載しています。',
};

interface Post {
  slug: string;
  content: string;
  category?: string;
  frontmatter: {
      [key: string]: any;
  };
}

export default async function WorksPage() {
  const posts = await getMarkdowns('docs/works');
  posts.sort((a, b) => a.frontmatter.update_at < b.frontmatter.update_at ? 1 : -1);
  return (
    <div className={styles.main}>
      <SubHeader />
      <div className={styles.container}>
        <h1>Works</h1>
        <div className={styles.articlesList}>
          {posts.map((post: Post) => (
            <LinkCard
              key={post.slug}
              href={`/works/${post.slug}`}
              title={post.frontmatter.title}
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