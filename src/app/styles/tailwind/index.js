import { boxShadow, colors, screens, typography } from './ui';

const presets = {
  theme: {
    screens,
    fontSize: typography,
    extend: {
      colors,
      boxShadow,
    },
  },
};

export default presets;
