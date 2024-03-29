import {
  MouseEventHandler,
  WheelEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { CarouselItemProps } from "src/types";
import CarouselItem from "./CarouselItem";

// example list
const _list: CarouselItemProps[] = [
  {
    id: 1,
    title: "video example",
    text: "description",
    video: "/assets/mov_bbb.mp4",
  },
  {
    id: 9,
    title: "video example",
    text: "description",
    video: "/assets/mov_bbb.mp4",
  },
  { id: 2, title: "2", image: "/assets/image.jpg" },
  { id: 3, title: "3", image: "/assets/image.jpg" },
  { id: 4, title: "4", image: "/assets/image.jpg" },
  { id: 5, title: "5", image: "/assets/image.jpg" },
  { id: 6, title: "6", image: "/assets/image.jpg" },
];

function Carousel() {
  const ref = useRef<HTMLDivElement>(null);
  let scroll = true;
  const [list, setList] = useState(_list); //to store the list of items
  const [itemNo, setItemNo] = useState(0); //to store the current item of the list
  const [canScroll, setCanScroll] = useState(true); //used to stop fast scrolling
  const [dragY, setDragY] = useState<null | number>(null); //stores mouse click coordinates to check for swipe
  const [height, setHeight] = useState(0); //stores

  //to allow scroll after a short duration
  const setScrollTimeout = async () => {
    setTimeout(() => {
      setCanScroll(true);
      scroll=true
    }, 550);
  };

  const onMouseDown = (y: number) => {
    // console.log("calling")
    setDragY(y);
  };

  const onMouseUp = (y: number) => {
    if (!dragY) return;
    if (y < dragY) {
      nextItem();
    }
    if (y > dragY) {
      previousItem();
    }
    setDragY(null);
  };

  //handles scroll
  const onWheel: WheelEventHandler = (evt) => {
    if (!canScroll) return;
    console.log(canScroll);

    if (evt.deltaY > 0) {
      nextItem();
    } else if (evt.deltaY < 0) {
      previousItem();
    }
  };

  const nextItem = () => {
    // adding new items and deleting old items on reaching the end
    if (!canScroll || !scroll) return;
    if (itemNo > list.length - 4) {
      setList((old) => {
        return removeOldItem(addNewItem(old));
      });
      setCanScroll(false);
      scroll = false;
      setScrollTimeout();
      return;
    }

    setItemNo((old) => old + 1);
    scroll = false;
    setCanScroll(false);
    setScrollTimeout();
  };

  //moves the carousel to the previous item
  const previousItem = () => {
    if (!canScroll || !scroll) return;
    if (itemNo === 0) return;
    setItemNo((old) => old - 1);
    scroll = false;
    setCanScroll(false);
    setScrollTimeout();
  };

  //removes old items to save memory
  const removeOldItem = (list: any[]) => {
    return [...list.splice(1)];
  };

  //adds new items on reaching near the end
  const addNewItem = (list: any[]) => {
    console.log("adding", canScroll);
    return [
      ...list,
      {
        id: Date.now() + "" + Math.random(),
        title: Date.now() + "",
        image: "/assets/image.jpg",
      },
    ];
  };

  useEffect(() => {
    setHeight(ref.current?.clientHeight as number);
    window.addEventListener("resize", () => {
      setHeight(ref.current?.clientHeight as number);
    });
  }, []);

  return (
    <div
      ref={ref}
      onTouchStart={(evt) => {
        onMouseDown(evt.touches[0].clientY);
      }}
      onTouchMove={(evt) => {
        evt.preventDefault();
        onMouseUp(evt.touches[0].clientY);
      }}
      onWheel={onWheel}
      onMouseDown={(e) => onMouseDown(e.clientY)}
      onMouseUp={(e) => onMouseUp(e.clientY)}
      className={`w-full h-full overflow-hidden relative  `}
    >
      {ref.current &&
        list.map((item, index) => {
          return (
            <CarouselItem
              key={item.id}
              {...item}
              top={(index - itemNo) * (height as number)}
              currentItem={index === itemNo}
            />
          );
        })}
    </div>
  );
}

export default Carousel;
