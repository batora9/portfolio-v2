import { ReactNode, isValidElement } from 'react';
import { MediaCard } from '@/components/MediaCard';

interface Props {
  children: ReactNode;
}

export const Paragraph = ({ children }: Props) => {
  if (isValidElement(children) && children.type === 'a') {
    // もしpタグchildの要素がaタグで、かつ子要素が1つだけの場合
    // (リスト内のリンクの場合は除外)
    return <MediaCard href={children.props.href} style='left' />;
  }

  return <p>{children}</p>;
};
