"use client";

import { useUnit } from "effector-react";

import { Button } from "@/shared/ui";

import { $counter, $timerTicking, buttonClicked } from "./model";

export function AsyncCounter() {
  const click = useUnit(buttonClicked);
  const { counter, ticking } = useUnit({
    counter: $counter,
    ticking: $timerTicking,
  });

  return (
    <Button onClick={() => click()}>
      Count: {counter} ({ticking ? "ticking" : "idle"})
    </Button>
  );
}
