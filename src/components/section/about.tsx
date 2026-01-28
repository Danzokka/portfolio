import React, { ReactNode } from "react";
import { Separator } from "../ui/separator";
import { DATA } from "@/data/resume";
import { Badge } from "../ui/badge";
import Image from "next/image";
import BlurSeparator from "../ui/blur-separator";
import { H2, Lead } from "../ui/typography";
import { BlurFade } from "../ui/blur-fade";
import { DELAY_TIME } from "@/data/config";

const Skills = () => {
  return (
    <div className="grid grid-cols-5 gap-4 my-4">
      {/* Skills List */}
      {DATA.skills.map((skill, index) => (
        <BlurFade
          key={skill.name}
          delay={DELAY_TIME + (index + 3) * 0.5}
          className=""
        >
          <Badge key={skill.name} variant={"default"}>
            {skill.icon as unknown as ReactNode} <p>{skill.name}</p>
          </Badge>
        </BlurFade>
      ))}
    </div>
  );
};

const Works = () => {
  return (
    <div className="space-y-4 mt-4">
      {/* Works List */}
      {DATA.work.map((work, index) => (
        <BlurFade
          key={work.company}
          delay={DELAY_TIME + (index + DATA.skills.length + 3) * 0.5}
          className=""
        >
          <div key={work.company}>
            <h3 className="text-xl font-semibold">
              {work.position} at {work.company}
            </h3>
            <p className="text-sm text-muted-foreground">
              {work.startDate} - {work.endDate}
            </p>
            <p className="text-base">{work.description}</p>
          </div>
        </BlurFade>
      ))}
    </div>
  );
};

const About = () => {
  return (
    <section id="about">
      <BlurSeparator title="Sobre Mim" />
      <div className="min-h-screen h-full w-full grid grid-cols-2 mt-8">
        <div className="flex flex-col justify-center items-center p-8">
          <BlurFade delay={DELAY_TIME + 0 * 0.5} className="" inView>
            <H2>About the Rafael</H2>
          </BlurFade>
          <BlurFade delay={DELAY_TIME + 1 * 0.5} className="" inView>
            <Lead>
              Our team is composed of passionate professionals dedicated to
              delivering the best solutions for our clients. Get to know the
              people behind the projects.
            </Lead>
          </BlurFade>
          <BlurFade delay={DELAY_TIME + 2 * 0.5} className="w-full" inView>
            <Separator />
          </BlurFade>
          <Skills />
          <BlurFade
            delay={DELAY_TIME + (DATA.skills.length + 2) * 0.5}
            className="w-full"
            inView
          >
            <Separator />
          </BlurFade>
          <Works />
        </div>
        <div className="w-full">
          {/* Image */}
          <BlurFade
            delay={DELAY_TIME + 3 * 0.5}
            duration={100 * DELAY_TIME * ((DATA.skills.length + DATA.work.length) /2 )}
            className="w-full h-full"
            inView
          >
            <Image
              src={"/placeholder.png"}
              alt="About the Team"
              width={800}
              height={600}
              className="w-full h-full object-contain"
            />
          </BlurFade>
        </div>
      </div>
    </section>
  );
};

export default About;
