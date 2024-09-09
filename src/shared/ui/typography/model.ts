import { ComponentProps, ElementType, ReactNode } from "react";

import { cn } from "@/shared/lib";
import cs from "@/shared/ui/typography/component.module.scss";

const sizes = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  xxl: "xxl",
} as const;

const weights = {
  thin: "thin",
  regular: "regular",
  medium: "medium",
  semibold: "semibold",
  bold: "bold",
} as const;

type OwnProps<T extends ElementType = ElementType> = {
  tag?: T;
  className?: string;
  children?: ReactNode;
  size?: keyof typeof sizes;
  weight?: keyof typeof weights;
};

type TSizes = keyof typeof sizes;
type TWeights = keyof typeof weights;

export type Props<T extends ElementType> = OwnProps<T> & ComponentProps<T>;
export const makeClassName = (
  { size, weight }: { size: TSizes; weight: TWeights },
  className: string,
) => {
  return cn(
    size && cs[sizes[size as TSizes]],
    weight && cs[weights[weight as TWeights]],
    className,
  );
};
