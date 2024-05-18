import React, { useEffect, useMemo, useRef, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function App() {
  //#region states

  const imageList = useRef<HTMLDivElement>(null);

  const [maxScrollLeft, setMaxScrollLeft] = useState<number>(0)

  const [scrollPosition, setScrollPosition] = useState<number>(0)

  const isAtStart: boolean = useMemo(() => scrollPosition <= 0, [scrollPosition]);

  const isAtEnd: boolean = useMemo(() => scrollPosition >= maxScrollLeft, [scrollPosition, maxScrollLeft]);

  useEffect(() => {
    if (imageList.current) {
      setMaxScrollLeft(imageList.current.scrollWidth - imageList.current.clientWidth)
    }
  }, [imageList])

  //#endregion

  //#region Functions

  function renderImages() {
    const imgSlider: JSX.Element[] = [];
    for (let i = 0; i < 10; i++) {
      const img: JSX.Element = (
        <img
          src={`img-${i + 1}.jpg`}
          alt={`img-${i}`}
          key={i + 1}
          className="image__item"
        />
      );
      imgSlider.push(img);
    }

    return imgSlider;
  }

  // Moves the scrollbar left.
  function prevSlide() {
    if (imageList.current) {
      const scrollAmount = imageList.current?.clientWidth * -1;
      imageList.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }

  // Moves the scrollbar right.
  function nextSlide() {
    if (imageList.current) {
      const scrollAmount = imageList.current?.clientWidth * 1;
      imageList.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }

  // Set the scroll position & maxScroll in the state.
  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    setScrollPosition(e.currentTarget.scrollLeft)
  }

  //#endregion

  return (
    <div className="container">
      <div className="slider__wrapper">
        <button
          id="prev__slide"
          className={`slide__button symbols__rounded ${isAtStart ? "display__none" : ""}`}
          onClick={prevSlide}
        >
          <BiChevronLeft />
        </button>
        <div className="image__list" ref={imageList} onScroll={handleScroll}>
          {renderImages()}
        </div>
        <button
          id="next__slide"
          className={`slide__button symbols__rounded ${isAtEnd ? "display__none" : ""}`}
          onClick={nextSlide}
        >
          <BiChevronRight />
        </button>
      </div>
    </div>
  );
}
