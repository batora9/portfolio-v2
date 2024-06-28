import { getMarkdowns } from "../../../utils/markdown";

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