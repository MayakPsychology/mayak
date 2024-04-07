import PropTypes from 'prop-types';
import { Swiper } from 'swiper/react';
import 'swiper/css';

export { SwiperSlide as Slide } from 'swiper/react';

export function Slider({ children, className, ...swiperProps }) {
  return (
    <Swiper {...swiperProps} wrapperClass={className}>
      {children}
    </Swiper>
  );
}

Slider.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  swiperProps: PropTypes.object,
};
