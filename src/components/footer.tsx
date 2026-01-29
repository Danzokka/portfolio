import { Dot } from "lucide-react";
import React from "react";
import { ShineBorder } from "./ui/shine-border";
import { Button } from "./ui/button";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { DELAY_TIME, DELAY_TIME_MULTIPLIER } from "@/data/config";
import { BlurFade } from "./ui/blur-fade";
import { H2 } from "./ui/typography";
import ShiningButton from "./ui/shining-button";

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="w-full px-4 pt-16 pb-8 sm:px-6 lg:px-8 lg:pt-24">
        <BlurFade delay={DELAY_TIME + 0 * DELAY_TIME_MULTIPLIER} className="" inView>
          <div className="w-full flex items-center justify-center text-lg">
            <span className="flex items-center relative p-2 pr-4 rounded-full">
              <ShineBorder shineColor="white" borderWidth={2} />
              <Dot className="size-8" />
              Available for work
            </span>
          </div>
        </BlurFade>
        <div className="text-center mt-4">
          <BlurFade delay={DELAY_TIME + 1 * DELAY_TIME_MULTIPLIER} className="" inView>
            <H2>Lorem ipsum dolor sit amet</H2>
          </BlurFade>
          <BlurFade delay={DELAY_TIME + 2 * DELAY_TIME_MULTIPLIER} className="" inView>
            <ShiningButton
              href="#"
              className="mt-8 px-6 py-3 text-lg font-medium"
            >
              Get Started
            </ShiningButton>
          </BlurFade>

          <div>
            {/* Social Media Icons */}
            {
              /* Placeholder for social media icons */
              DATA.contact.social.map((social, index) => (
                <BlurFade
                  delay={DELAY_TIME + (3 + index) * DELAY_TIME_MULTIPLIER}
                  className=""
                  inView
                  key={social.name}
                >
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
                </BlurFade>
              ))
            }
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
