import { boxShadow, colors, screens, typography, backgroundImage } from './ui';

const presets = {
  theme: {
    screens,
    fontSize: typography,
    extend: {
      colors,
      boxShadow,
      backgroundImage,
    },
  },
};

export default presets;
