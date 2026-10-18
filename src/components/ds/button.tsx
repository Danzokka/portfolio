import { clsx } from "clsx";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

// dan_the_dev DS · Button (components/core/Button.jsx)
const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none border-2 font-mono font-semibold uppercase tracking-[.08em] cursor-pointer outline-none no-underline transition-[background-color,border-color,color,box-shadow,transform] duration-150 focus-visible:shadow-[0_0_0_2px_#07090D,0_0_0_4px_#00FF88] active:[transform:translate(2px,2px)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:flex-none";

const variants = {
  primary:
    "bg-green text-ink border-green hover:bg-green-hover hover:text-ink hover:shadow-[4px_4px_0_color-mix(in_srgb,#00FF88_30%,#090A0E)] hover:[transform:translate(-2px,-2px)]",
  secondary: "bg-surface text-fg border-hairline hover:border-green hover:text-fg",
  outline: "bg-transparent text-fg border-hairline hover:bg-green/10 hover:border-green hover:text-green",
  ghost: "bg-transparent text-muted border-transparent hover:bg-surface hover:text-fg",
};

const sizes = {
  sm: "h-8 px-3 text-[.6875rem]",
  md: "h-10 px-[1.125rem] text-xs",
  lg: "h-[3.25rem] px-7 text-sm",
  icon: "size-10 p-0",
};

type Common = { variant?: keyof typeof variants; size?: keyof typeof sizes };

export function buttonClass({ variant = "primary", size = "md" }: Common = {}, className?: string) {
  return clsx(base, variants[variant], sizes[size], className);
}

export function Button({
  variant,
  size,
  className,
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={buttonClass({ variant, size }, className)} {...rest} />;
}

export function ButtonLink({
  variant,
  size,
  className,
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={buttonClass({ variant, size }, className)} {...rest} />;
}
