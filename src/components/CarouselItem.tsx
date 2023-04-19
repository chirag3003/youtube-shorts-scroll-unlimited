import { CarouselItemProps } from "src/types";

function CarouselItem(props: CarouselItemProps) {
  return (
    <div style={{top: props.top??0 }} className="h-full w-full py-5 absolute transition-all duration-500">
      <div
        style={{ backgroundImage: `url(${props.image})`}}
        className="content relative bg-yellow-100 rounded-3xl h-full w-full flex justify-center bg-cover bg-center"
      >
        <div className="title absolute bottom-10 left-5">
          <p className="text-3xl text-white ">{props.title}</p>
        </div>
      </div>
    </div>
  );
}

export default CarouselItem;
