import Link from "next/link";

import { cn } from "@/lib/utils";

function BrandMark({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("inline-flex size-7 shrink-0", className)}
      style={{
        WebkitMaskImage: "url(/logo-icon.png)",
        maskImage: "url(/logo-icon.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
      {...props}
    >
      <span className="block size-full bg-trust-blue dark:bg-paper" />
    </span>
  );
}

function Brand({
  className,
  href = "/",
  showName = true,
}: {
  className?: string;
  href?: string;
  showName?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
    >
      <BrandMark />
      {showName && (
        <span className="font-display text-sm font-medium tracking-tight">
          TFB
        </span>
      )}
    </Link>
  );
}

export { Brand, BrandMark };
