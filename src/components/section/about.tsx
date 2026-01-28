import React, { ReactNode } from "react";
import { Separator } from "../ui/separator";
import { DATA } from "@/data/resume";
import { Badge } from "../ui/badge";
import Image from "next/image";
import BlurSeparator from "../ui/blur-separator";

const Skills = () => {
  return (
    <div className="grid grid-cols-5 gap-4 my-4">
      {/* Skills List */}
      {DATA.skills.map((skill) => (
        <Badge key={skill.name} variant={"default"}>
          {skill.icon as unknown as ReactNode} <p>{skill.name}</p>
        </Badge>
      ))}
    </div>
  );
};

const Works = () => {
  return (
    <div className="space-y-4 mt-4">
      {/* Works List */}
      {DATA.work.map((work) => (
        <div key={work.company}>
          <h3 className="text-xl font-semibold">
            {work.position} at {work.company}
          </h3>
          <p className="text-sm text-muted-foreground">{work.startDate} - {work.endDate}</p>
          <p className="text-base">{work.description}</p>
        </div>
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
          <h2 className="text-4xl font-bold mb-4">About the Rafaeel</h2>
          <p className="text-lg text-center max-w-md mb-4">
            Our team is composed of passionate professionals dedicated to
            delivering the best solutions for our clients. Get to know the
            people behind the projects.
          </p>
          <Separator />
          <Skills />
          <Separator />
          <Works />
        </div>
        <div className="w-full">
          {/* Image */}
          <Image
            src={"/placeholder.png"}
            alt="About the Team"
            width={800}
            height={600}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
