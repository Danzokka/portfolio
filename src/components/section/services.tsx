import React from "react";
import BlurSeparator from "../ui/blur-separator";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { DATA } from "@/data/resume";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Service } from "@/types/user";
import { BlurFade } from "../ui/blur-fade";
import { DELAY_TIME } from "@/data/config";
import { H2, Lead } from "../ui/typography";

const ServiceList = () => {
  return (
    <div className="flex flex-wrap gap-4 my-4 w-full justify-between">
      {DATA.services.map((service, index) => (
        <div key={service.title}>
          <BlurFade delay={DELAY_TIME + (index + 4) * 0.5} className="" inView>
            <Badge variant="default" className="">
              <div className="flex items-center gap-3 py-2 w-full">
                <span>{service.icon}</span>
                <span className="">{service.title}</span>
              </div>
            </Badge>
          </BlurFade>
        </div>
      ))}
    </div>
  );
};

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <Card className="bg-transparent border-none">
      <CardHeader className="-mb-4">
        <CardTitle>
          <div className="flex items-center gap-3 py-2 w-full">
            <span>{service.icon}</span>
            <span className="">{service.title}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <div className="px-5 w-full">
        <Separator />
      </div>
      <CardContent>
        <p>{service.description}</p>
      </CardContent>
    </Card>
  );
};

const Services = () => {
  return (
    <section id="services">
      <div className="w-full min-h-screen h-full">
        <BlurFade delay={DELAY_TIME + 0 * 0.5} className="" inView>
          <BlurSeparator title="Meus Serviços" />
        </BlurFade>
        {/* Services + Image Placeholder */}
        <div className="w-full grid grid-cols-2 gap-4 mt-8">
          {/* Text Placeholder */}
          <div className="flex flex-col justify-center items-start p-8">
            <BlurFade delay={DELAY_TIME + 1 * 0.5} className="" inView>
              <H2>O que eu ofereço</H2>
            </BlurFade>
            <BlurFade delay={DELAY_TIME + 2 * 0.5} className="mt-4" inView>
              <Lead>
                Ofereço uma variedade de serviços para ajudar você a alcançar
                seus objetivos digitais. Desde o desenvolvimento de sites
                personalizados até a otimização para mecanismos de busca, estou
                aqui para ajudar seu negócio a crescer online.
              </Lead>
            </BlurFade>
            <BlurFade
              delay={DELAY_TIME + 3 * 0.5}
              className="w-full mt-6"
              inView
            >
              <Separator />
            </BlurFade>
            <div className="w-full">
              <ServiceList />
            </div>
          </div>
          {/* Image Placeholder */}
          <BlurFade delay={DELAY_TIME + 2 * 0.5} className="" inView>
            <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground">Imagem de Serviços</span>
            </div>
          </BlurFade>
        </div>
        {/* Services With Description */}
        <div className="grid grid-cols-3 w-full mt-8 gap-4">
          {DATA.services.map((service, index) => (
            <BlurFade
              key={service.title}
              delay={DELAY_TIME + (DATA.services.length + 4 + index) * 0.5}
              className=""
              inView
            >
              <ServiceCard service={service} />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
