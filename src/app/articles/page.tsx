import { getMarkdowns } from "../../../utils/markdown";

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
  return (
    <div>
      <h1>Articles</h1>
      <ul>
        {posts.map((post: Post) => (
          <li key={post.slug}>
            <a href={`/articles/${post.slug}`}>{post.frontmatter.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}