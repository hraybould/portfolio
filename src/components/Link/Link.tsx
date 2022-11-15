import React from "react";

interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
  baseClass?: string;
  hoverable?: boolean;
  additionalClassNames?: string;
  target?: React.HTMLAttributeAnchorTarget;
  // children prop implied
}

export const Link: React.FC<LinkProps> = ({
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
