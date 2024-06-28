import fs from "fs";
import matter from "gray-matter";
import path from "path";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "docs/works");
  const posts = fs.readdirSync(postsDirectory);
  const params = [];
  for(const post of posts) {
    const filePath = path.join(postsDirectory, post);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    params.push({
      params: {
        slug: data.slug,
      },
    });
  }
  return params;
}

export default async function WorkPost({ params }: Props) {
  const postsDirectory = path.join(process.cwd(), "docs/works");
  const filePath = path.join(postsDirectory, `${params.slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(fileContents);

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.date}</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}