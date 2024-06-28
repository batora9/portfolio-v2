import fs from "fs";
import matter from "gray-matter";
import path from "path";

interface Props {
  params: {
    id: string;
    slug: string;
  };
  searchParams: {};
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "docs/works");
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ""),
      },
    };
  });
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