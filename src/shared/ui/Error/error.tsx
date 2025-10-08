import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function Error({ className, children, ...props }: ComponentProps<"p">) {
  if (!children)
    return null;

  return (
    <p
      data-slot="error"
      className={cn(
        "text-sm text-main-foreground font-medium",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export { Error };
