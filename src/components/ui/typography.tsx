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

export function Lead({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: string;
}) {
  return <p className={`text-lg text-gray-300 text-${align}`}>{children}</p>;
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="leading-7 not-first:mt-6">{children}</p>;
}

export function List({ children }: { children: React.ReactNode }) {
  return <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>;
}

export function Muted({ children }: { children: React.ReactNode }) {
  return <span className="text-sm text-muted-foreground">{children}</span>;
}