import React from 'react';
import styles from './Typography.module.scss';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';

interface TypographyProps {
  tag?: Variant;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}

const Typography: React.FC<TypographyProps> = ({
  tag = 'p',
  variant = tag,
  children,
  className = '',
}) => {
  const Tag = tag;
  const variantStyles = styles[variant];

  return (
    <Tag className={`${styles.typography} ${variantStyles} ${className}`}>
      {children}
    </Tag>
  );
};

export default Typography;
