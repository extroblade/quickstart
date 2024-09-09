import { ElementType } from "react";

import { TCard, useMappedData } from "@/features/statistics/model";
import { cn } from "@/shared/lib";
import { Typography } from "@/shared/ui";

import { Block } from "../Block";
import cs from "./Card.module.scss";

export const Card = ({
  change,
  blocks,
  isRow,
  tag,
  current,
}: TCard & { tag?: ElementType }) => {
  const Tag = tag || "div";
  const { title, description, state } = useMappedData({ current, change });

  return (
    <Tag className={cs.card}>
      <header className={cs.text}>
        <Typography className={cs.title} tag="p">
          {title}
        </Typography>
        <Typography className={cs.description} tag="p">
          <span
            className={cn(
              state.isPositiveChange && cs.positive,
              state.isNegativeChange && cs.negative,
            )}
          >
            {state.changeValue}
          </span>{" "}
          {description}
        </Typography>
      </header>
      <Block blocks={blocks} isRow={isRow} />
    </Tag>
  );
};
