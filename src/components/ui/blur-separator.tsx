import React from "react";

const BlurSeparator = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center w-full">
      <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
      <div className="border bg-primary z-10 rounded-xl px-4 py-1">
        <span className="text-background text-sm font-medium">{title}</span>
      </div>
      <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
    </div>
  );
};

export default BlurSeparator;
