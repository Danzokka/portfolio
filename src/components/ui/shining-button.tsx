import { Button } from "./button";
import { cn } from "@/lib/utils";
import { ShineBorder } from "./shine-border";
import Link from "next/link";
import { buttonVariants } from "./button";
import { VariantProps } from "class-variance-authority";

const ShiningButton = ({
  className,
  children,
  href,
  size = "default",
  variant = "shining",
  ...props
}: React.ComponentProps<"button"> & {
  className?: string;
  children: React.ReactNode;
  href?: string;
} & VariantProps<typeof buttonVariants>) => {

  if (href) {
    return (
      <Button
        asChild
        className={cn(buttonVariants({ variant, size, className }))}
        size={size}
        variant={variant}
        {...props}
      >
        <Link href={href}>
          <>
            <ShineBorder shineColor="white" borderWidth={2} duration={30} />
            {children}
          </>
        </Link>
      </Button>
    );
  }

  return (
    <Button className={cn(buttonVariants({ variant, size, className }))}>
      <>
        <ShineBorder shineColor="white" borderWidth={2} duration={30} />
        {children}
      </>
    </Button>
  );
};

export default ShiningButton;
