"use client";
import { useCallback } from "react";

import { AsyncCounter } from "@/features/async-counter";
import { AudioPlayer } from "@/features/audio-player";
import { TreeView } from "@/shared/ui";

const data = [
  {
    component: "test",
    id: "test",
    children: [
      {
        id: "test20",
        component: "test2",
        children: [
          {
            id: "test3",
            component: "test3",
          },
          {
            id: "test31",
            component: "test31",
          },
        ],
      },
      {
        id: "test21",
        component: "test2",
        children: [
          {
            id: "test4",
            component: "test4",
          },
          {
            id: "test41",
            component: "test41",
          },
        ],
      },
    ],
  },
  { component: "test11", id: "test11" },
];

export const Page = () => {
  const onChangeHandler = useCallback((e: any) => {
    e.stopPropagation();
    console.log("changed");
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AsyncCounter />
      <AudioPlayer audioSrc={""} />
      <TreeView data={data} onChange={onChangeHandler} />
    </main>
  );
};
