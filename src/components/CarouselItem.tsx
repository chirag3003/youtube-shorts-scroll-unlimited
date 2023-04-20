import { CarouselItemProps } from "src/types";

function CarouselItem(props: CarouselItemProps) {
  return (
    <div
      style={{ top: props.top ?? 0 }}
      className="h-full w-full py-5 absolute transition-all duration-500"
    >
      <div
        style={props.image ? { backgroundImage: `url(${props.image})` } : {}}
        className="content relative bg-yellow-100 rounded-3xl h-full w-full flex justify-center bg-cover bg-center overflow-hidden"
      >
        {props.video && <video
          autoPlay
          className="video-stream html5-main-video h-full w-full object-cover"
          data-no-fullscreen="true"
          src="/assets/mov_bbb.mp4"
          loop={true}
        ></video>}
        <div className="title absolute bottom-10 left-5">
          <p className="text-3xl text-white ">{props.title}</p>
          <p className="description text-gray-50 text-xl">{props.text}</p>
        </div>
      </div>
    </div>
  );
}

export default CarouselItem;
