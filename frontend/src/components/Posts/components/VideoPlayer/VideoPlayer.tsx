type TVideoPlayer = { videoUrl: string; width?: string; height?: string };
const VideoPlayer = ({
  videoUrl,
  width = "600",
  height = "auto",
}: TVideoPlayer) => {
  return (
    <div>
      {videoUrl ? (
        <video width={width} controls height={height}>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default VideoPlayer;
