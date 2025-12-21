"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn, getHotelImages } from "@/lib/utils";
import { type Hotel } from "@/types";

interface HotelImageCarouselProps {
  hotel: Hotel;
}

const HotelImageCarousel = ({ hotel }: HotelImageCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const allImages = getHotelImages(hotel);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative w-full">
      {allImages.length > 0 ? (
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {allImages.map((imageUrl, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="relative w-full h-full aspect-4/3 bg-gray-light">
                  <Image
                    src={imageUrl}
                    alt={`${hotel.name} - Image ${index + 1}`}
                    fill
                    className="object-cover h-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <div className="w-full aspect-4/3 flex items-center justify-center text-secondary bg-gray-light">
          No image available
        </div>
      )}

      {allImages.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
          {allImages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => api?.scrollTo(index)}
              className={cn("rounded-full transition-all", {
                "bg-white size-2": current === index + 1,
                "bg-white/50 hover:bg-white/75 size-1.5": current !== index + 1,
              })}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelImageCarousel;
