import { Dot } from "lucide-react";
import React from "react";
import { ShineBorder } from "./ui/shine-border";
import { Button } from "./ui/button";
import Link from "next/link";
import { DATA } from "@/data/resume";

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="w-full px-4 pt-16 pb-8 sm:px-6 lg:px-8 lg:pt-24">
        <div className="w-full flex items-center justify-center text-lg">
          <span className="flex items-center relative p-2 pr-4 rounded-full">
            <ShineBorder shineColor="white" borderWidth={2} />
            <Dot className="size-8" />
            Available for work
          </span>
        </div>
        <div className="text-center mt-4">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-5xl dark:text-white">
            Lorem ipsum dolor sit amet
          </h2>

          <Button asChild className="mt-8 px-6 py-3 text-lg font-medium">
            <Link href="#">Get Started</Link>
          </Button>

          <div>
            {/* Social Media Icons */}
            {
              /* Placeholder for social media icons */
              DATA.contact.social.map((social) => (
                <Button
                  key={social.name}
                  asChild
                  variant={"ghost"}
                  size={"icon-lg"}
                >
                  <Link
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </Link>
                </Button>
              ))
            }
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
