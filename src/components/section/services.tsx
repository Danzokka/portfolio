import React from "react";
import BlurSeparator from "../ui/blur-separator";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { DATA } from "@/data/resume";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Service } from "@/types/user";

const ServiceList = () => {
  return (
    <div className="flex flex-wrap gap-4 my-4 w-full justify-between">
      {DATA.services.map((service) => (
        <div key={service.title}>
          <Badge variant="default" className="">
            <div className="flex items-center gap-3 py-2 w-full">
              <span>{service.icon}</span>
              <span className="">{service.title}</span>
            </div>
          </Badge>
        </div>
      ))}
    </div>
  );
};

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <Card>
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
        <BlurSeparator title="Meus Serviços" />
        {/* Services + Image Placeholder */}
        <div className="w-full grid grid-cols-2 gap-4 mt-8">
          {/* Text Placeholder */}
          <div className="flex flex-col justify-center items-start p-8">
            <h2 className="text-3xl font-bold mb-4">O que eu ofereço</h2>
            <p className="text-lg mb-4">
              Ofereço uma variedade de serviços para ajudar você a alcançar seus
              objetivos digitais. Desde o desenvolvimento de sites
              personalizados até a otimização para mecanismos de busca, estou
              aqui para ajudar seu negócio a crescer online.
            </p>
            <Separator />
            <div className="w-full">
              <ServiceList />
            </div>
          </div>
          {/* Image Placeholder */}
          <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground">Imagem de Serviços</span>
          </div>
        </div>
        {/* Services With Description */}
        <div className="grid grid-cols-3 w-full mt-8 gap-4">
          {DATA.services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
