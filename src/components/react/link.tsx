import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  href: string;
  external?: boolean;
  className?: string;
  underline?: boolean;
  [key: string]: any;
}

const Link: React.FC<Props> = ({
  href,
  external,
  className,
  underline,
  children,
  ...rest
}) => {
  return (
    <a
      href={href}
      target={external ? '_blank' : '_self'}
      className={cn(
        'inline-block transition-colors duration-300 ease-in-out',
        underline &&
          'decoration-muted-foreground hover:decoration-foreground underline underline-offset-[3px]',
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
};

export default Link;
