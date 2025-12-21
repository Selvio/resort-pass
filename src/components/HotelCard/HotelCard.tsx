import { ChevronRight, Star } from "lucide-react";
import { Fragment, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { amenityIcons } from "@/lib/amenityIcons";
import { formatPrice } from "@/lib/utils";
import type { Currency, Hotel } from "@/types";

import HotelImageCarousel from "./HotelImageCarousel";

interface HotelCardProps {
  hotel: Hotel;
  currency?: Currency;
}

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className="size-3 fill-black text-black" />
      ))}
      {hasHalfStar && (
        <div className="relative size-3 overflow-hidden">
          <Star className="absolute size-3 fill-black/20 text-black/20" />
          <div className="absolute left-0 top-0 h-full w-1/2 overflow-hidden">
            <Star className="size-3 fill-black text-black" />
          </div>
        </div>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} className="size-3 fill-none text-black/20" />
      ))}
    </div>
  );
};

const HotelCard = ({ hotel, currency }: HotelCardProps) => {
  const [showAllProducts, setShowAllProducts] = useState(false);
  const currencySymbol = currency?.symbol || "$";
  const rating = hotel.avgRating || hotel.rating || 0;
  const reviews = hotel.reviews || 0;
  const primaryVibe = hotel.vibes?.primary || "";
  const location = `${hotel.cityName}, ${hotel.state}`;

  // Get first 5 amenities for display
  const displayedAmenities = hotel.amenities?.slice(0, 5) || [];

  // Get products for display based on showAllProducts state
  const allProducts = hotel.products || [];
  const displayedProducts = showAllProducts
    ? allProducts
    : allProducts.slice(0, 3);
  const remainingProductsCount = Math.max(0, allProducts.length - 3);

  const handleViewAllClick = () => {
    setShowAllProducts(true);
  };

  const handleShowLessClick = () => {
    setShowAllProducts(false);
  };

  return (
    <Card className="overflow-hidden">
      <HotelImageCarousel hotel={hotel} />
      <CardContent className="p-4">
        <h2 className="font-medium text-base mb-0.5">{hotel.name}</h2>

        <div className="flex items-center gap-2 flex-wrap mb-1">
          <div className="flex items-center gap-1.5">
            {renderStars(rating)}
            {rating.toFixed(1)}
            <span className="text-sm text-secondary">({reviews})</span>
          </div>
          <span className="text-secondary">|</span>
          <span className="text-sm text-secondary">
            {location}
            {primaryVibe && ` | ${primaryVibe}`}
          </span>
        </div>

        {displayedAmenities.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap mb-4">
            {displayedAmenities.map((amenity, index) => {
              const amenityKey = amenity.name.toLowerCase();
              const icon =
                amenityIcons[amenityKey] ||
                amenityIcons[amenity.iconText?.toLowerCase() || ""];

              if (!icon) {
                return null;
              }

              return (
                <div
                  key={amenity.name || index}
                  className="text-secondary"
                  title={amenity.name}
                >
                  {icon}
                </div>
              );
            })}
          </div>
        )}

        {displayedProducts.length > 0 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              {displayedProducts.map((product, index) => {
                const hasDiscount = product.discountPercentage > 0;
                const originalPrice = product.isStrikethroughPricing
                  ? product.maxPrice
                  : null;
                const showAvailabilityBadge =
                  product.quantity > 0 && product.quantity <= 5;
                const isSoldOut = product.quantity === 0;

                return (
                  <Fragment key={product.id}>
                    <div className="flex items-center justify-between gap-2">
                      <div>{product.name}</div>
                      <div className="flex items-center gap-1">
                        {hasDiscount && (
                          <Badge variant="success">
                            Save{" "}
                            {Number(
                              (product.discountPercentage * 100).toFixed(1)
                            )}
                            %
                          </Badge>
                        )}
                        {isSoldOut && <Badge variant="default">Sold Out</Badge>}
                        {showAvailabilityBadge && (
                          <Badge variant="warning">
                            Only {product.quantity} Left
                          </Badge>
                        )}
                        <span className="text-base">
                          {formatPrice(product.price, currencySymbol)}
                        </span>
                        {originalPrice && (
                          <span className="text-xs text-secondary line-through">
                            {formatPrice(originalPrice, currencySymbol)}
                          </span>
                        )}
                      </div>
                    </div>
                    {index < displayedProducts.length - 1 && <Separator />}
                  </Fragment>
                );
              })}
            </div>
            {!showAllProducts && remainingProductsCount > 0 && (
              <div className="flex items-center justify-between pt-1">
                <span>+{remainingProductsCount} more experiences</span>
                <Button onClick={handleViewAllClick}>
                  View All <ChevronRight className="size-5" />
                </Button>
              </div>
            )}
            {showAllProducts && allProducts.length > 3 && (
              <div className="flex items-center justify-center pt-1">
                <Button onClick={handleShowLessClick} variant="outline">
                  Show Less
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HotelCard;
