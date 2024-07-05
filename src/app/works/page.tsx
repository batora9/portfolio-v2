import { getMarkdowns } from "../../../utils/markdown";
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
  return (
    <div>
      <h1>Works</h1>
      <ul>
        {posts.map((post: Post) => (
          <li key={post.slug}>
            <a href={`/works/${post.slug}`}>{post.frontmatter.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}