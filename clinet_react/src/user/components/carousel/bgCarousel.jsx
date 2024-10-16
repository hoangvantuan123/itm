import { useState, useEffect, useRef } from 'react';
import image1 from '../../../assets/image1.jpg';
import image2 from '../../../assets/image2.jpg';
import image3 from '../../../assets/image3.jpg';
import image4 from '../../../assets/image2.jpg';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
const images = [image1, image2, image3, image4];

export default function BgCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const timeoutRef = useRef(null);
  const totalSlides = images.length;

  const preloadImages = (imageArray) => {
    return Promise.all(
      imageArray.map((image) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = image;
          img.onload = resolve;
        });
      })
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    preloadImages(images).then(() => {
      setIsLoading(false);
      timeoutRef.current = setTimeout(nextSlide, 7000);
    });

    return () => resetTimeout();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      resetTimeout();
      timeoutRef.current = setTimeout(nextSlide, 7000);
    }
    return () => resetTimeout();
  }, [currentIndex, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin indicator={<LoadingOutlined spin />} />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden ">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          willChange: 'transform',
        }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className="w-full h-screen object-cover"
            loading="lazy"
          />
        ))}
      </div>

     {/*  <button
        className="absolute left-5 top-1/2 transform -translate-y-1/2  text-white p-2 rounded-full"
        onClick={() =>
          setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
          )
        }
      >
        ❮
      </button>
      <button
        className="absolute right-5 top-1/2 transform -translate-y-1/2  text-white p-2 rounded-full"
        onClick={nextSlide}
      >
        ❯
      </button> */}

      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-gray-500'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
