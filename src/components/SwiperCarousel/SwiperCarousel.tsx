// Swiper is split into many modules
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/autoplay";

/**
 * A simple wrapper around Swiper component
 */
export const SwiperCarousel: React.FC<SwiperProps> = ({
  spaceBetween = 50,
  slidesPerView = 3,
  navigation = true,
  keyboard = true,
  autoplay = {
    delay: 2500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  loop = true,
  loopFillGroupWithBlank = true,
  pagination = {
    clickable: true,
    dynamicBullets: true,
    // dynamicMainBullets: 3,
  },
  children,
}) => {
  return (
    <Swiper
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      // Each module may need some props with it
      modules={[Autoplay, Navigation, Pagination]}
      // Navigation Props - START
      navigation={navigation}
      keyboard={keyboard}
      // Navigation Props - END
      // Pagination Props - START
      pagination={pagination}
      // Pagination Props - END
      // Loop Props - START
      autoplay={autoplay}
      loop={loop}
      loopFillGroupWithBlank={loopFillGroupWithBlank}
      // Loop Props - END
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      {children}
    </Swiper>
  );
};

// Exported simply to reduce the amount of imports when using SwiperCarousel
export { SwiperSlide as SwiperCarouselSlide };
