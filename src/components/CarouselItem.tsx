import { useEffect, useRef, useState } from "react";
import { CarouselItemProps } from "src/types";

function CarouselItem(props: CarouselItemProps) {
    const ref = useRef<HTMLVideoElement>(null)
    const [isPlaying,setIsPlaying] = useState(false) //to check if video is playing or not

    //to toggle video on Click
    const togglePlay = () => {

      if(isPlaying){
        setIsPlaying(false)
        ref.current?.pause()
      } else {
        setIsPlaying(true)
        ref.current?.play()
      }
    }
    useEffect(() => {
      //plays or pauses the video if the video is displayed on the screen
      if(props.currentItem && ref.current){
        ref.current.play()
        setIsPlaying(true)
      } else {
        ref.current?.pause()
        setIsPlaying(false)
      }
    },[props.currentItem])
  return (
    <div
      style={{ top: props.top ?? 0 }}
      className="h-full w-full py-5 absolute transition-all duration-500"
    >
      <div
        style={props.image ? { backgroundImage: `url(${props.image})` } : {}}
        className="content relative bg-yellow-100 rounded-3xl h-full w-full flex justify-center bg-cover bg-center overflow-hidden"
      >
        {props.video && (
          <video
            ref={ref}
            className="video-stream html5-main-video h-full w-full object-cover"
            data-no-fullscreen="true"
            src="/assets/mov_bbb.mp4"
            onClick={togglePlay}
            loop={true}
          ></video>
        )}
        <div className="title absolute bottom-10 left-5">
          <p className="text-3xl text-white ">{props.title}</p>
          <p className="description text-gray-50 text-xl">{props.text}</p>
        </div>
      </div>
    </div>
  );
}

export default CarouselItem;
