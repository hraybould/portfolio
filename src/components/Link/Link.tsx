interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
  baseClass?: string;
  hoverable?: boolean;
  additionalClassNames?: string;
  target?: React.HTMLAttributeAnchorTarget;
}

/**
 * A basic anchor element (`<a ...>`) to uniformly make links
 */
export const Link: React.FC<React.PropsWithChildren<LinkProps>> = ({
  baseClass = "Link",
  hoverable = true,
  target = "_blank",
  additionalClassNames = "",
  children,
  ...anchorProps
}) => {
  return (
    <a
      className={`${baseClass} ${
        hoverable ? "Btn NoPadding NoBorder" : ""
      } ${additionalClassNames}`}
      target={target}
      // TODO: learn more about how this affects SEO
      rel="nofollow"
      {...anchorProps}
    >
      {children}
    </a>
  );
};
