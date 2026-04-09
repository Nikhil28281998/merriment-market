import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CelebrationSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  color: string;
}

interface CelebrationCarouselProps {
  title: string;
  slides: CelebrationSlide[];
  autoScroll?: boolean;
  interval?: number;
}

export const CelebrationCarousel = ({ 
  title, 
  slides, 
  autoScroll = true, 
  interval = 5000 
}: CelebrationCarouselProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!autoScroll) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoScroll, interval, slides.length]);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const getVisibleSlides = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(slides[(current + i) % slides.length]);
    }
    return result;
  };

  const visibleSlides = getVisibleSlides();

  return (
    <div className="w-full py-12 px-4 md:px-6">
      {/* Section Title */}
      <div className="container mb-8">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground">Swipe through to get inspired</p>
      </div>

      {/* Carousel Container */}
      <div className="container">
        <div className="relative">
          {/* Slides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {visibleSlides.map((slide, idx) => (
              <div
                key={slide.id}
                className="transition-all duration-500 ease-out"
                style={{
                  opacity: idx === 0 ? 1 : 0.6,
                  transform: idx === 0 ? "scale(1)" : "scale(0.95)",
                }}
              >
                <Card className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300 h-full">
                  {/* Image Container */}
                  <div
                    className={`relative h-64 md:h-72 w-full overflow-hidden ${slide.color}`}
                  >
                    {/* Fallback Gradient + Icon */}
                    <div className="absolute inset-0 bg-gradient-to-br flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-6xl mb-4">
                          {slide.id === 1 && "💍"}
                          {slide.id === 2 && "🎂"}
                          {slide.id === 3 && "👶"}
                          {slide.id === 4 && "🏢"}
                          {slide.id === 5 && "🎉"}
                          {slide.id === 6 && "🎵"}
                          {slide.id === 7 && "🎨"}
                          {slide.id === 8 && "🍽️"}
                        </div>
                        <p className="font-bold text-lg">{slide.title}</p>
                      </div>
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-6">
                    <h3 className="font-semibold text-lg md:text-xl truncate">{slide.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                      {slide.description}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={next}
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-6 md:mt-8">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 md:h-3 rounded-full transition-all duration-300 ${
                idx === current ? "bg-accent w-8" : "bg-slate-300 w-2 md:w-3"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CelebrationCarousel;
