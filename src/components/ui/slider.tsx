'use client';

import { useRef } from 'react';
// @ts-ignore
import Slider from 'react-slick';

const CustomSlider = ({ settings, children }: React.PropsWithChildren<{ settings: any }>) => {
  const sliderRef = useRef<Slider | null>(null);
  return (
    <Slider {...settings} ref={sliderRef}>
      {children}
    </Slider>
  );
};

interface SliderButtonProps {
  ref: React.RefObject<Slider | null>;
  direction: 'prev' | 'next';
  className?: string;
  children?: React.ReactNode;
}

const SliderButton = ({ ref, direction, className, children }: SliderButtonProps) => {
  const handleClick = () => {
    if (direction === 'prev') {
      ref.current?.slickPrev();
    } else {
      ref.current?.slickNext();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-10 h-10 p-2 rounded-full bg-white slider-btn-shadow hover:bg-gray-100 ${className || ''}`}
    >
      {children}
    </button>
  );
};

const SliderPrevButton = ({ ref, className, children }: Omit<SliderButtonProps, 'direction'>) => {
  return (
    <SliderButton ref={ref} direction="prev" className={className}>
      {children}
    </SliderButton>
  );
};

const SliderNextButton = ({ ref, className, children }: Omit<SliderButtonProps, 'direction'>) => {
  return (
    <SliderButton ref={ref} direction="next" className={className}>
      {children}
    </SliderButton>
  );
};

export { CustomSlider, SliderPrevButton, SliderNextButton };
