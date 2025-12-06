'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CarouselItem } from '@/types';

interface CarouselProps {
  items: CarouselItem[];
  onSlideClick?: (item: CarouselItem) => void;
}

export default function Carousel({ items, onSlideClick }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  return (
    <div className="relative rounded-xl overflow-hidden h-48 bg-gray-200">
      <div
        className="h-full flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="min-w-full h-full relative cursor-pointer group"
            onClick={() => onSlideClick?.(item)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/api/searchImage?query=' + encodeURIComponent(item.title) + '&width=400&height=200';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 group-hover:bg-gradient-to-t group-hover:from-black/70 group-hover:to-transparent transition-all duration-300">
              <h3 className="text-white font-bold text-lg text-shadow group-hover:text-xl transition-all duration-300">
                {item.title}
              </h3>
              <p className="text-white/90 text-sm">
                {item.subtitle}
              </p>
            </div>
            {onSlideClick && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                  查看详情
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 轮播图指示器 */}
      <div className="absolute bottom-3 right-3 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* 轮播图控制按钮 */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}