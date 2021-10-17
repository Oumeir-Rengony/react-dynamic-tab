import React, { useEffect, useState } from "react";
import Arrow from "../../public/arrow.svg";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from "pure-react-carousel";

import "pure-react-carousel/dist/react-carousel.es.css";
import styled from "styled-components";
import useWindowSize from "../hooks/windowsize";

const Tab = ({ children }) => {
  const [slideCount, setSlideCount] = useState(1.5);
  const [activeIndex, setActiveIndex] = useState(0);

  const screenWidth = useWindowSize();

  //Find the active tab item on 1st render
  useEffect(() => {
    React.Children.forEach(children, (child, index) => {
      const { active } = child.props;
      if (active) setActiveIndex(index);
    });
  }, [children]);

  useEffect(() => {
    const updateSlideCount = (slideNo) => {
      const totalSlide = React.Children.count(children);
      totalSlide > slideNo ? setSlideCount(slideNo) : setSlideCount(totalSlide);
    };

    if (screenWidth < 832) {
      updateSlideCount(1.5);
    } else if (screenWidth < 1088) {
      updateSlideCount(3.5);
    } else if (screenWidth < 1272) {
      updateSlideCount(5);
    }
    //(screenWidth > 1272)
    else {
      updateSlideCount(6);
    }
  }, [screenWidth, children]);

  return (
    <TabWrapper>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        visibleSlides={slideCount}
        totalSlides={4}
        isIntrinsicHeight={true}
      >
        <nav className="nav">
          <ButtonBack className="btn-arrow">
            <img src={Arrow} alt="arrow" />
          </ButtonBack>

          <Slider>
            {React.Children.map(children, (child, index) => {
              const { title } = child.props;
              return (
                <Slide index={index}>
                  <div
                    className={`nav-item ${
                      activeIndex === index ? "active" : ""
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                    {title}
                  </div>
                </Slide>
              );
            })}
          </Slider>

          <ButtonNext className="btn-arrow reverse-arrow">
            <img src={Arrow} alt="arrow" />
          </ButtonNext>
        </nav>
      </CarouselProvider>

      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, { active: index === activeIndex });
      })}
    </TabWrapper>
  );
};

const TabWrapper = styled.div`
  .nav {
    display: flex;
    justify-content: center;

    .nav-item {
      padding: 12px 18px;
      text-align: center;
      color: #4b4c53;
      font-weight: bold;
      font-size: 16px;
      border-bottom: 2px solid #c3c4ca;
      cursor: pointer;
      white-space: nowrap;

      &:hover {
        background: #f5f6fc;
        color: #6267a1;
      }
    }

    .btn-arrow {
      min-width: 48px;
      height: 48px;
      border: none;
      background: #fff;

      &:disabled {
        visibility: hidden;
      }
    }

    .reverse-arrow {
      transform: rotateY(180deg);
    }

    .active {
      color: #6267a1;
      border-bottom: 2px solid #6267a1;
    }

    .arrow {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      z-index: 1;
      background: #fff;
    }
  }
`;

export default Tab;
