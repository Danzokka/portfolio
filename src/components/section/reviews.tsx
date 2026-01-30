"use client";
import React from "react";
import BlurSeparator from "../ui/blur-separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { BlurFade } from "../ui/blur-fade";
import { DELAY_TIME, DELAY_TIME_MULTIPLIER } from "@/data/config";
import { H2, H3, P, Lead } from "../ui/typography";
import { useLanguage } from "@/contexts/language-context";
import { DATA } from "@/data/resume"; // Kept for type inference if needed, but using hook for data

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
  const { data } = useLanguage();
  return (
    <section id="reviews">
      <div className="w-full min-h-screen h-full">
        <BlurFade delay={DELAY_TIME + 0 * DELAY_TIME_MULTIPLIER} className="" inView>
          <BlurSeparator title={data.sectionTitles.reviews} />
        </BlurFade>
        {/* Reviews Content Placeholder + Image*/}
        <div className="w-full grid grid-cols-2 gap-4 mt-8">
          {/* Image Placeholder */}
          <div className="w-full">
            <BlurFade delay={DELAY_TIME + 1 * DELAY_TIME_MULTIPLIER} className="" inView>
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
            <BlurFade delay={DELAY_TIME + 1 * DELAY_TIME_MULTIPLIER} className="" inView>
              <H2>
                {data.sectionTitles.reviewsSubtitle}
              </H2>
            </BlurFade>
            <BlurFade delay={DELAY_TIME + 2 * DELAY_TIME_MULTIPLIER} className="mt-4" inView>
              <Lead>
                {data.sectionTitles.reviewsDescription}
              </Lead>
            </BlurFade>
          </div>
        </div>
        <div className="w-full grid grid-cols-3 gap-4 mt-8">
          {
            /* Review Cards */
            data.reviews.map((review, index) => (
              <BlurFade
                key={index}
                delay={DELAY_TIME + (index + 4) * DELAY_TIME_MULTIPLIER}
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
            {data.metrics.map((metric, index) => (
              <BlurFade
                key={index}
                delay={DELAY_TIME + (data.reviews.length + 4 + index) * DELAY_TIME_MULTIPLIER}
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