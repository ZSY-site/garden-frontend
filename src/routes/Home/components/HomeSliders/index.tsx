import React, { PropsWithChildren, useRef, useEffect } from "react";
import { Carousel } from "antd";
import "./index.less";
// import { Slider } from "@/typings/lesson";
import { Slider } from "@/typings/slider";

type Props = PropsWithChildren<{
  children?: any;
  sliders?: Slider[];
  getSliders?: () => void;
}>;

function HomeSliders(props: Props) {
  useEffect(() => {
    if (props.sliders.length == 0) {
      props.getSliders();
    }
  }, []);
  return (
    <Carousel effect="scrollx" autoplay>
      {props.sliders.map((item: Slider, index: number) => (
        <div key={index}>
          <img src={item.url} />
        </div>
      ))}
    </Carousel>
  );
}

export default HomeSliders;
