export function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="scroll-m-20 text-center text-8xl font-bold tracking-tight text-balance">
      {children}
    </h1>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight text-balance">
      {children}
    </h2>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-balance">
      {children}
    </h3>
  );
}

export function H4({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-balance">
      {children}
    </h4>
  );
}

export function Lead({ children, align = "left" }: { children: React.ReactNode ; align?: string }) {
  return <p className={`text-lg text-muted-foreground text-${align}`}>{children}</p>;
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="leading-7 not-first:mt-6">{children}</p>;
}