import React from "react";
import BlurSeparator from "../ui/blur-separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";

const ReviewCard = () => {
  return (
    <div className="p-4 rounded-lg shadow-md">
      <Avatar className="size-20">
        <img
          src="/placeholder.png"
          alt="Client Avatar"
          className="object-cover"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <h3 className="text-xl font-semibold mb-2">Client Name</h3>
      <h4 className="text-md font-medium mb-2">CEO of Business X</h4>
      <Separator className="my-2" />
      <p className="text-base mb-4">
        "This is a sample review. The service provided was exceptional and
        exceeded my expectations."
      </p>
      <div className="flex items-center gap-2 text-xl">
        <span>5.0</span>
        <span className="text-yellow-400">★★★★★</span>
      </div>
    </div>
  );
}

const Reviews = () => {
  return (
    <section id="reviews">
      <div className="w-full min-h-screen h-full">
        <BlurSeparator title="Reviews" />
        {/* Reviews Content Placeholder + Image*/}
        <div className="w-full grid grid-cols-2 gap-4 mt-8">
          {/* Image Placeholder */}
          <div className="w-full">
            {/* Image */}
            <img
              src={"/placeholder.png"}
              alt="Reviews Placeholder"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          {/* Text Placeholder */}
          <div className="p-8">
            {/* Text */}
            <h2 className="text-8xl font-bold mb-4">
              Client <br /> Reviews
            </h2>
            <p className="text-lg mb-4">
              Real feedback from clients who trusted my design expertise to
              elevate their brands successfully.
            </p>
          </div>
        </div>
        <div className="w-full grid grid-cols-3 gap-4 mt-8">
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>
        <div className="w-full">
          {/* Metrics */}
          <div className="flex justify-around mt-12 item-center gap-4">
            <div className="text-center">
              <h3 className="text-4xl font-bold">150+</h3>
              <p className="text-lg">Projects Completed</p>
            </div>
            <Separator orientation="vertical"/>
            <div className="text-center">
              <h3 className="text-4xl font-bold">100%</h3>
              <p className="text-lg">Client Satisfaction</p>
            </div>
            <Separator orientation="vertical" />
            <div className="text-center">
              <h3 className="text-4xl font-bold">3+</h3>
              <p className="text-lg">Years of Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
