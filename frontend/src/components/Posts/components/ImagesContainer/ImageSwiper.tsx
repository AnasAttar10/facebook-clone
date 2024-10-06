import React, { useState } from "react";
import styled from "styled-components";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

// Styled Components
const SwiperContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const SlideWrapper = styled.div`
  display: flex;
  align-items: center;
  transition: transform 0.3s ease-in-out;
  max-height: 350px;
`;

const Slide = styled.div`
  min-width: 100%;
  height: auto;
  box-sizing: border-box;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10;

  &:disabled {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const PrevButton = styled(NavigationButton)`
  left: 10px;
`;

const NextButton = styled(NavigationButton)`
  right: 10px;
`;

// Props type
type ImageSwiperProps = {
  images: string[];
};

// Swiper Component
const ImageSwiper: React.FC<ImageSwiperProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <SwiperContainer>
      <SlideWrapper
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <Slide key={index}>
            {src.includes("video") && (
              <VideoPlayer videoUrl={src} width="100%" />
            )}
            {src.includes("image") && (
              <Image src={src} alt={`Slide ${index}`} />
            )}
          </Slide>
        ))}
      </SlideWrapper>
      <PrevButton onClick={handlePrev} disabled={images.length <= 1}>
        &lt;
      </PrevButton>
      <NextButton onClick={handleNext} disabled={images.length <= 1}>
        &gt;
      </NextButton>
    </SwiperContainer>
  );
};

export default ImageSwiper;
