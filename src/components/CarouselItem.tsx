import { useEffect, useRef, useState } from "react";
import ReactInstaStories from "react-insta-stories";
import { CarouselItemProps } from "src/types";

function CarouselItem(props: CarouselItemProps) {
  const [isMouseDown, setIsMouseDown] = useState(false);

  function Story({
    item: props,
    isPaused,
  }: {
    item: CarouselItemProps;
    isPaused: boolean;
  }) {
    const ref = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false); //to check if video is playing or not

    useEffect(() => {
      if (props.currentItem && ref.current && !isMouseDown) {
        ref.current.play();
        setIsPlaying(true);
      } else {
        ref.current?.pause();
        setIsPlaying(false);
      }
    }, [props.currentItem, isMouseDown]);
    return (
      <div
        style={props.image ? { backgroundImage: `url(${props.image})` } : {}}
        className="content relative  rounded-3xl h-full w-full flex justify-center bg-cover bg-center overflow-hidden"
      >
        {props.video && (
          <video
            ref={ref}
            className="video-stream html5-main-video h-full w-full object-cover"
            data-no-fullscreen="true"
            src="/assets/mov_bbb.mp4"
          ></video>
        )}
        <div className="title absolute bottom-10 left-5">
          <p className="text-3xl text-white ">{props.title}</p>
          <p className="description text-gray-50 text-xl">{props.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ top: props.top ?? 0 }}
      className="py-5 absolute transition-all duration-500 overflow-hidden"
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
    >
      <ReactInstaStories
        defaultInterval={8000}
        stories={[
          {
            // content: ({ isPaused }) => {
            //   return (
            //     <>
            //       <Story item={props} isPaused={isPaused} />
            //     </>
            //   );
            // },
            url: "/assets/image.jpg",
            type: "image",
          },
          {
            // content: ({ isPaused }) => {
            //   return (
            //     <>
            //       <Story item={props} isPaused={isPaused} />
            //     </>
            //   );
            // },
            url: "/assets/mov_bbb.mp4",
            type: "video",
          },
        ]}
        width={"100%"}
      />
    </div>
  );
}

export default CarouselItem;
