"use client";
import React, { ReactNode } from "react";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import Image from "next/image";
import BlurSeparator from "../ui/blur-separator";
import { H2, H3, Lead, List, Muted, P } from "../ui/typography";
import { BlurFade } from "../ui/blur-fade";
import { DELAY_TIME, DELAY_TIME_MULTIPLIER } from "@/data/config";
import { useLanguage } from "@/contexts/language-context";

const Skills = () => {
  const { data } = useLanguage();
  return (
    <div className="flex flex-wrap gap-4 my-4">
      {/* Skills List */}
      {data.skills.map((skill, index) => (
        <BlurFade
          key={skill.name}
          delay={DELAY_TIME + (index + 4) * DELAY_TIME_MULTIPLIER}
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
  const { data } = useLanguage();
  return (
    <div className="grid grid-cols-2 justify-between mt-8 w-full gap-8">
      {/* Works List */}
      {data.work.map((work, index) => (
        <BlurFade
          key={work.company}
          delay={
            DELAY_TIME +
            (index + data.skills.length + 5) * DELAY_TIME_MULTIPLIER
          }
          className="w-full"
        >
          <div key={work.company}>
            <H3>
              {work.position} at {work.company}
            </H3>
            <Muted>
              {work.location} | {work.startDate} - {work.endDate}
            </Muted>
            {work.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 my-2">
                {work.technologies.map((tech) => (
                  <Badge
                    key={tech.name}
                    variant="outline"
                    className="text-xs font-medium border border-border h-8 w-fit px-2"
                  >
                    {tech.icon as unknown as ReactNode} {tech.name}
                  </Badge>
                ))}
              </div>
            )}
            <Separator className="mt-4" />
            <P>{work.description}</P>
            <List>
              {work.responsibilities.map((resp, respIndex) => (
                <li key={respIndex}>{resp}</li>
              ))}
            </List>
          </div>
        </BlurFade>
      ))}
    </div>
  );
};

const About = () => {
  const { data } = useLanguage();
  return (
    <section id="about">
      <BlurSeparator title={data.sectionTitles.about} />
      <div className="min-h-screen h-full w-full mt-8">
        <div className="grid grid-cols-2">
          <div className="flex flex-col justify-center items-center p-8">
            <BlurFade
              delay={DELAY_TIME + 1 * DELAY_TIME_MULTIPLIER}
              className=""
              inView
            >
              <H2>{data.sectionTitles.aboutSubtitle}</H2>
            </BlurFade>
            <BlurFade
              delay={DELAY_TIME + 2 * DELAY_TIME_MULTIPLIER}
              className=""
              inView
            >
              <Lead>{data.sectionTitles.aboutDescription}</Lead>
            </BlurFade>
            <BlurFade
              delay={DELAY_TIME + 3 * DELAY_TIME_MULTIPLIER}
              className="w-full mt-2"
              inView
            >
              <Separator />
            </BlurFade>
            <Skills />
          </div>
          <div className="w-full">
            {/* Image */}
            <BlurFade
              delay={DELAY_TIME + 1 * DELAY_TIME_MULTIPLIER}
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
        <Works />
      </div>
    </section>
  );
};

export default About;
