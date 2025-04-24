'use client';

import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import type { TestimonialBlock as TestimonialBlockType } from '@/payload-types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// @ts-ignore
import Slider from 'react-slick';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';
import { cn } from '@/utilities/ui';

type TestimonialBlockProps = TestimonialBlockType & {
  className?: string;
};

const Testimonials: React.FC<TestimonialBlockProps> = ({
  title,
  subtitle,
  reviews,
  gradientBackground,
  className,
}) => {
  const sliderRef = useRef<Slider | null>(null);
  const settings = {
    className: 'center',
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: '40px',
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '30px',
        },
      },
    ],
    speed: 500,
  };
  return (
    <section
      className={cn(
        'relative flex flex-col gap-5 md:gap-[2.75rem] testimonials-section',
        className,
      )}
    >
      {(title || subtitle) && (
        <div className="flex flex-col container items-center gap-2">
          {title && <RichText data={title} />}
          {subtitle && <RichText data={subtitle} className="section-subtitle" />}
        </div>
      )}
      <div className="carousel-container md:px-[3.75rem] w-full relative overflow-hidden">
        {gradientBackground && (
          <Media
            resource={gradientBackground}
            // className="absolute top-[50%] translate-y-[-50%] scale-[3.5] sm:scale-100"
            className="absolute top-[50%] custom-background-gradient"
          />
        )}
        {/* //TODO: something which can be improved here */}
        <Slider {...settings} ref={sliderRef}>
          {reviews?.map((review) => (
            <article
              key={review.id}
              className="bg-surface-container w-[424px] rounded-2xl review-card-shadow"
            >
              <div className="flex flex-col p-4 md:p-6 gap-6 h-fit">
                <div className="flex flex-col gap-1">
                  <svg
                    className="w-5 md:w-10 h-5 md:h-10"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="40" height="40" fill="white" />
                    <path
                      d="M9.13281 28.5696V24.1572C9.13281 22.8172 9.36977 21.3954 9.84369 19.892C10.3339 18.3722 11.0366 16.9096 11.9518 15.5042C12.8833 14.0824 14.0027 12.8486 15.3101 11.8027L18.4477 14.3521C17.4182 15.8228 16.5194 17.359 15.7513 18.9605C14.9996 20.5457 14.6237 22.2452 14.6237 24.0592V28.5696H9.13281ZM21.6834 28.5696V24.1572C21.6834 22.8172 21.9204 21.3954 22.3943 19.892C22.8845 18.3722 23.5872 16.9096 24.5024 15.5042C25.4339 14.0824 26.5533 12.8486 27.8607 11.8027L30.9983 14.3521C29.9688 15.8228 29.07 17.359 28.3019 18.9605C27.5502 20.5457 27.1743 22.2452 27.1743 24.0592V28.5696H21.6834Z"
                      fill="black"
                    />
                  </svg>
                  {review.comment && (
                    <RichText
                      data={review.comment}
                      className="text-on-surface text-left text-sm md:text-lg font-normal"
                    />
                  )}
                </div>
                <div className="review-card-author-container w-full px-3 py-2 rounded-[8px] flex justify-start items-start gap-4">
                  <div className="w-12 h-12 rounded-full overflow-clip shrink-0">
                    <Media resource={review?.reviewerInfo?.profileImage} />
                  </div>
                  <div className="flex flex-col justify-start w-full">
                    {review?.reviewerInfo?.name && (
                      <RichText data={review.reviewerInfo.name} className="font-semibold" />
                    )}
                    {review?.reviewerInfo?.bio && (
                      <RichText
                        data={review.reviewerInfo.bio}
                        className="text-on-surface text-sm"
                      />
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </Slider>
      </div>
      <div className="container flex gap-4 w-full justify-center items-center">
        <button
          onClick={() => sliderRef.current?.slickPrev()}
          className="w-10 h-10 p-2 rounded-full bg-white slider-btn-shadow hover:bg-gray-100"
        >
          <ChevronLeftIcon width={20} height={20} className="mx-auto" />
        </button>
        <button
          onClick={() => sliderRef.current?.slickNext()}
          className="w-10 h-10 p-2 rounded-full bg-white slider-btn-shadow hover:bg-gray-100"
        >
          <ChevronRightIcon width={20} height={20} className="mx-auto" />
        </button>
      </div>
    </section>
  );
};

export { Testimonials };
