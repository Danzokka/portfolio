import React from "react";
import BlurSeparator from "../ui/blur-separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { BlurFade } from "../ui/blur-fade";
import { DELAY_TIME } from "@/data/config";
import { H2, H3, H4, Lead, P } from "../ui/typography";
import { DATA } from "@/data/resume";

const Metric = ({ value, label }: { value: string; label: string }) => {
  return (
    <div className="text-center">
      <H3>{value}</H3>
      <P>{label}</P>
    </div>
  );
};

const ReviewCard = ({ review }: { review: (typeof DATA.reviews)[0] }) => {
  return (
    <div className="p-4 rounded-lg shadow-md">
      <Avatar className="size-20">
        <img src={review.avatar} alt="Client Avatar" className="object-cover" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <H3>{review.name}</H3>
      <Lead>{review.position}</Lead>
      <Separator className="my-2" />
      <P>"{review.reviewText}"</P>
      <div className="flex items-center gap-2 text-xl">
        <span>{review.rating.toFixed(1)}</span>
        <span className="text-yellow-400">★★★★★</span>
      </div>
    </div>
  );
};

const Reviews = () => {
  return (
    <section id="reviews">
      <div className="w-full min-h-screen h-full">
        <BlurFade delay={DELAY_TIME + 0 * 0.5} className="" inView>
          <BlurSeparator title="Reviews" />
        </BlurFade>
        {/* Reviews Content Placeholder + Image*/}
        <div className="w-full grid grid-cols-2 gap-4 mt-8">
          {/* Image Placeholder */}
          <div className="w-full">
            <BlurFade delay={DELAY_TIME + 1 * 0.5} className="" inView>
              {/* Image */}
              <img
                src={"/placeholder.png"}
                alt="Reviews Placeholder"
                className="w-full h-auto object-cover rounded-lg"
              />
            </BlurFade>
          </div>
          {/* Text Placeholder */}
          <div className="p-8">
            {/* Text */}
            <BlurFade delay={DELAY_TIME + 1 * 0.5} className="" inView>
              <H2>
                Client <br /> Reviews
              </H2>
            </BlurFade>
            <BlurFade delay={DELAY_TIME + 2 * 0.5} className="mt-4" inView>
              <Lead>
                Real feedback from clients who trusted my design expertise to
                elevate their brands successfully.
              </Lead>
            </BlurFade>
          </div>
        </div>
        <div className="w-full grid grid-cols-3 gap-4 mt-8">
          {
            /* Review Cards */
            DATA.reviews.map((review, index) => (
              <BlurFade
                key={index}
                delay={DELAY_TIME + (index + 4) * 0.5}
                className=""
                inView
              >
                <ReviewCard review={review} />
              </BlurFade>
            ))
          }
        </div>
        <div className="w-full">
          {/* Metrics */}
          <div className="flex justify-around mt-12 item-center gap-4">
            {DATA.metrics.map((metric, index) => (
              <BlurFade
                key={index}
                delay={DELAY_TIME + (DATA.reviews.length + 4 + index) * 0.5}
                className=""
                inView
              >
                <Metric value={metric.value} label={metric.label} />
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
