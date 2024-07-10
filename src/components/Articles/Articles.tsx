import { getMarkdowns } from '../../../utils/markdown';
import { LinkButton } from '../LinkButton';
import { LinkCard } from '../LinkCard';
import styles from './Articles.module.css';

export async function Articles() {
  const posts = await getMarkdowns('docs/articles');
  const recentPosts = posts.sort((a, b) => a.frontmatter.updatedAt < b.frontmatter.updatedAt ? 1 : -1).slice(0, 4);
  return (
    <div className={styles.container}>
      <p className={styles.title}>Recent Articles</p>
      <div className={styles.cards}>
        {recentPosts.map((post) => (
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
      <div className={styles.contents}>
        <LinkButton href='/articles/'>
          More Details
        </LinkButton>
      </div>
    </div>
  );
}