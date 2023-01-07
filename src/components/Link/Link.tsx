interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
  // General
  baseClass?: string;
  additionalClassNames?: string;
  // Helpers
  hoverable?: boolean;
  noPrintDecoration?: boolean;
  printableLink?: boolean;
  // achor tag props
  target?: React.HTMLAttributeAnchorTarget;
}

/**
 * A basic anchor element (`<a ...>`) to uniformly make links
 */
export const Link: React.FC<React.PropsWithChildren<LinkProps>> = ({
  // General
  baseClass = "Link",
  additionalClassNames = "",
  // Helpers
  hoverable = true,
  noPrintDecoration = false,
  printableLink = false,
  // achor tag props
  target = "_blank",
  children,
  ...anchorProps
}) => {
  return (
    <a
      className={`${baseClass} ${hoverable ? "Btn NoPadding NoBorder" : ""} ${
        noPrintDecoration ? "NoPrintDecoration" : ""
      } ${additionalClassNames}`}
      target={target}
      // TODO: learn more about how this affects SEO
      rel="nofollow"
      {...anchorProps}
    >
      {children}
      {printableLink && (
        <span className="DisplayNone IsPrintable"> ({anchorProps.href})</span>
      )}
    </a>
  );
};
