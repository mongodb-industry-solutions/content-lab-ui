"use client"

import { useRef, useState, useEffect } from "react"
import Icon from "@leafygreen-ui/icon"
import styles from "./Carousel.module.css"

export default function Carousel({ children, itemsPerView = 4, gap = 16 }) {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const childrenArray = Array.isArray(children) ? children : [children]

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  const scrollTo = (direction) => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.clientWidth / itemsPerView
      const scrollAmount = itemWidth + gap

      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }
  }

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      checkScrollability()
      scrollContainer.addEventListener("scroll", checkScrollability)
      window.addEventListener("resize", checkScrollability)

      return () => {
        scrollContainer.removeEventListener("scroll", checkScrollability)
        window.removeEventListener("resize", checkScrollability)
      }
    }
  }, [])

  return (
    <div className={styles.carouselContainer}>
      <button
        className={`${styles.navButton} ${styles.navButtonLeft} ${!canScrollLeft ? styles.navButtonDisabled : ""}`}
        onClick={() => scrollTo("left")}
        disabled={!canScrollLeft}
        aria-label="Previous items"
      >
        <Icon glyph="ChevronLeft" />
      </button>

      <div ref={scrollRef} className={styles.carouselTrack} style={{ gap: `${gap}px` }}>
        {childrenArray.map((child, index) => (
          <div
            key={index}
            className={styles.carouselItem}
            style={{ minWidth: `calc((100% - ${gap * (itemsPerView - 1)}px) / ${itemsPerView})` }}
          >
            {child}
          </div>
        ))}
      </div>

      <button
        className={`${styles.navButton} ${styles.navButtonRight} ${!canScrollRight ? styles.navButtonDisabled : ""}`}
        onClick={() => scrollTo("right")}
        disabled={!canScrollRight}
        aria-label="Next items"
      >
        <Icon glyph="ChevronRight" />
      </button>
    </div>
  )
}
