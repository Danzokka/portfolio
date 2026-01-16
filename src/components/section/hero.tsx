import VideoBg from "../ui/video-bg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden h-screen w-screen">
      <VideoBg source="/videos/waves.mp4" />
      <div className="flex flex-col items-center justify-center h-full relative z-10">
        <h1 className="text-5xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p className="text-lg text-center max-w-2xl">
          I am a passionate developer specializing in creating beautiful and
          functional web applications. Explore my projects and services below.
        </p>
      </div>
    </section>
  );
};

export default Hero;
