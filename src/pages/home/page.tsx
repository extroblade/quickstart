import { AsyncCounter } from "@/features/async-counter";
import { AudioPlayer } from "@/features/audio-player";

export const Page = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AsyncCounter />
      <AudioPlayer audioSrc={""} />
    </main>
  );
};
