import { ElementType } from "react";

import { makeClassName, Props } from "./model";

export const Typography = <T extends ElementType = ElementType>({
  tag,
  children,
  size,
  weight,
  className,
  ...props
}: Props<T>) => {
  const Tag = tag || "p";
  const classes = makeClassName({ size, weight }, className);
  return (
    <Tag {...props} className={classes}>
      {children}
    </Tag>
  );
};
