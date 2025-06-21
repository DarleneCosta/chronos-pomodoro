import { Link } from 'react-router';

type RouterLinkProps = {
  children: React.ReactNode;
  href: string;
} & React.ComponentProps<'a'>;

export default function RouterLink({
  children,
  href,
  ...props
}: RouterLinkProps) {
  return (
    <Link {...props} to={href}>
      {children}
    </Link>
  );
}
