import { getMarkdowns } from '../../../utils/markdown';
import { LinkButton } from '../LinkButton';
import { LinkCard } from '../LinkCard';
import styles from './Works.module.css';

export async function Works() {
  const posts = await getMarkdowns('docs/works');
  const recentPosts = posts.slice(0, 3);
  return (
    <div className={styles.container}>
      <p className={styles.title}>Recent Works</p>
      <div className={styles.cards}>
        {recentPosts.map((post) => (
          <LinkCard
            key={post.slug}
            href={`/articles/${post.slug}`}
            title={post.frontmatter.title}
            description={post.frontmatter.description}
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