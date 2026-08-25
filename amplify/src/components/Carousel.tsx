import { useState } from 'react'
import type { CarouselSlide } from '../data/campaign'

interface CarouselProps {
  slides: CarouselSlide[]
  label: string
}

export function Carousel({ slides, label }: CarouselProps) {
  const [index, setIndex] = useState(0)
  const max = slides.length - 1

  return (
    <div className="carousel" role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="carousel__viewport">
        <div
          className="carousel__track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className="carousel__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              aria-hidden={i !== index}
            >
              <SlideView slide={slide} />
            </div>
          ))}
        </div>
      </div>
      <div className="carousel__nav">
        <button type="button" onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0}>
          Prev
        </button>
        <div className="carousel__dots" role="tablist" aria-label={`${label} slides`}>
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <button type="button" onClick={() => setIndex((i) => Math.min(max, i + 1))} disabled={index === max}>
          Next
        </button>
      </div>
    </div>
  )
}

function SlideView({ slide }: { slide: CarouselSlide }) {
  const layout = slide.layout ?? 'list'
  return (
    <div className={`slide slide--${slide.tone} slide--${layout}`}>
      {slide.kicker && <p className="slide__kicker">{slide.kicker}</p>}
      <h3 className="slide__title">{slide.title}</h3>
      {slide.body && <p className="slide__body">{slide.body}</p>}
      {slide.list && (
        <ul className="slide__list">
          {slide.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {layout === 'map' && (
        <div className="slide__map" aria-hidden="true">
          Map artwork placeholder
        </div>
      )}
      {slide.footer && <p className="slide__footer">{slide.footer}</p>}
    </div>
  )
}
