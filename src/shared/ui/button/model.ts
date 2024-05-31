import Link from "next/link";
import { ComponentProps, ElementType } from "react";

import { cn } from "@/shared/lib";

export type Variants = "primary" | "secondary";

type OwnProps<E extends ElementType = ElementType> = {
  children: React.ReactNode;
  variant?: Variants;
  as?: E;
  href?: string;
};

export type Props<E extends ElementType> = OwnProps<E> &
  Omit<ComponentProps<E>, keyof OwnProps>;

export const defaultElement = "button";

export const isLinkComponent = (
  component: ElementType,
): component is typeof Link => component === Link;

const variants = {
  primary: "bg-blue-500 hover:bg-blue-600 text-white",
  secondary: "bg-gray-500 hover:bg-gray-600 text-white",
} satisfies Record<Variants, string>;

export const makeClassName = (variant: Variants, className: string) => {
  return cn(variants[variant], className);
};
