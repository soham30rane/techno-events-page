import "./bg_video.css";
const BackgroundVideo = () => {
  return (
    <div className="background-video">
      <video autoPlay muted loop>
        <source src={require("../../video/bg_video.mp4")} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
  
export default BackgroundVideo;