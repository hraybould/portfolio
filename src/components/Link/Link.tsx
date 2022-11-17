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
  additionalClassNames,
  children,
  ...anchorProps
}) => {
  const classes = `${baseClass} ${hoverable ? "Hoverable" : ""} ${
    additionalClassNames ? additionalClassNames : ""
  }`;
  return (
    <a className={classes} target={target} {...anchorProps}>
      {children}
    </a>
  );
};
