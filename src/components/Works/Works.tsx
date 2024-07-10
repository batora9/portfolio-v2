import { getMarkdowns } from '../../../utils/markdown';
import { LinkButton } from '../LinkButton';
import { LinkCard } from '../LinkCard';
import styles from './Works.module.css';

export async function Works() {
  const posts = await getMarkdowns('docs/works');
  const recentPosts = posts.sort((a, b) => a.frontmatter.updatedAt < b.frontmatter.updatedAt ? 1 : -1).slice(0, 3);
  return (
    <div className={styles.container}>
      <p className={styles.title}>Recent Works</p>
      <div className={styles.cards}>
        {recentPosts.map((post) => (
          <LinkCard
            key={post.slug}
            variant='project-link'
            href={`/works/${post.slug}`}
            title={post.frontmatter.title}
            description={post.frontmatter.description}
            createdAt={post.frontmatter.createdAt}
            imageSrc={post.frontmatter.image}
            imageAlt={post.frontmatter.title}
          />
        ))}
      </div>
      <div className={styles.contents}>
        <LinkButton href="/works/">
          More Details
        </LinkButton>
      </div>
    </div>
  );
}