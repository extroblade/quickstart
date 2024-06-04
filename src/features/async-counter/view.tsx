"use client";
import { Button } from "@/shared/ui";

import { useCounter } from "./model";

export function AsyncCounter() {
  const { counter, ticking, click } = useCounter();

  return (
    <Button onClick={() => click()}>
      Count: {counter} ({ticking ? "ticking" : "idle"})
    </Button>
  );
}
