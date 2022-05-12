export { ArrowRight } from './arrow-right';
export { Logo } from './logo';

type Props = {
  shape: { path: string; outline: boolean };
  className?: string;
};

const styleInfo = (outline: boolean) => (outline ? 'none' : 'currentColor');

export const Icon = ({ shape, className }: Props) => (
  <svg
    viewBox={shape.outline ? '0 0 24 24' : '0 0 20 20'}
    dangerouslySetInnerHTML={{ __html: shape.path }}
    style={{
      fill: styleInfo(shape.outline),
      stroke: styleInfo(!shape.outline),
    }}
    className={className ?? ''}
  />
);
