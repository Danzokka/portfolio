const VideoBg = ({
  source,
  type,
}: {
  source: string;
  type?: string | "video/mp4";
}) => {
  return (
    <video
      autoPlay
      loop
      muted
      className="absolute inset-0 w-full h-full object-cover z-0"
    >
      <source src={source} type={type || "video/mp4"} />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoBg;
