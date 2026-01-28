import React from "react";
import { ShineBorder } from "./shine-border";

const BlurSeparator = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center w-full">
      <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
      <div className="relative z-10 rounded-xl px-4 py-1">
        <ShineBorder shineColor="white" borderWidth={2} duration={30} />
        <span className="text-white text-sm font-medium">{title}</span>
      </div>
      <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
    </div>
  );
};

export default BlurSeparator;
