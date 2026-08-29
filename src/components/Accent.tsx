import { cn } from "@/lib/utils";

export function Accent({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "mb-3 block h-1 w-8 rounded-full bg-gradient-to-r from-saffron to-chinar",
        className,
      )}
    />
  );
}
