import Link from "next/link";
import { ElementType } from "react";

import { defaultElement, isLinkComponent, makeClassName, Props } from "./model";

export const Button = <E extends ElementType = typeof defaultElement>({
  children,
  variant = "primary",
  as,
  className,
  ...otherProps
}: Props<E>) => {
  const classes = makeClassName(variant, className);
  const TagName = as || defaultElement;

  if (isLinkComponent(TagName)) {
    return (
      <Link href={otherProps.href || "#"} {...otherProps} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <TagName className={classes} {...otherProps}>
      {children}
    </TagName>
  );
};
