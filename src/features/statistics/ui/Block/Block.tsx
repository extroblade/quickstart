import { cn } from "@/shared/lib";
import { prepareMap } from "@/shared/lib/prepareMap";

import { TBlock } from "../../model";
import cs from "./Block.module.scss";

const getCssPercent = (_percent: number) => `${Math.round(_percent * 100)}%`;

export const Block = ({
  blocks,
  isRow,
  className,
}: {
  blocks: TBlock[];
  isRow?: boolean;
  className?: string;
}) => {
  return (
    <ul className={cn(cs.blocks, className)}>
      {prepareMap(blocks, "data").map(({ id, data: { percent, isActive } }) => (
        <li
          className={cn(isRow ? cs.row : cs.col, cs.stat)}
          key={id}
          style={!isRow ? { height: getCssPercent(percent) } : {}}
        >
          <div
            className={cn(cs.block, isActive && cs.active)}
            style={isRow ? { width: getCssPercent(percent) } : {}}
          />
        </li>
      ))}
    </ul>
  );
};
