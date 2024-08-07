"use client";
import { memo, ReactNode, useCallback } from "react";

type TreeViewProps = {
  component?: ReactNode;
  id: string;
  children?: TreeViewProps[];
};

const TreeViewMemo = ({
  data,
  onChange,
}: {
  data: TreeViewProps[];
  onChange?: (args: any) => void;
}) => {
  return (
    <div className={"flex flex-col gap-2"} onClick={onChange}>
      {data.map(({ component, id, children }) => (
        <div className={"flex flex-col gap-2"} key={id}>
          {component}

          {!!children && (
            <div className={"ml-5 flex flex-col gap-2"}>
              <TreeView data={children} onChange={onChange} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export const TreeView = memo(TreeViewMemo);
