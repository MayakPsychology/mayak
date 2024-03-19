const disabled = 'disabled:text-gray-400 disabled:border-gray-200';

export const buttonColorVariant = {
  filled: {
    blue: {
      regular: 'bg-primary-500 text-other-white',
      hover: 'hover:bg-primary-400',
      focused: 'focus:outline-none focus:bg-primary-600',
      active: 'active:bg-primary-700',
      disabled,
    },
  },
  tonal: {
    lightblue: {
      regular: 'bg-primary-200 text-gray-700',
      hover: 'hover:bg-primary-300',
      focused: 'focus:outline-none focus:bg-primary-300',
      active: 'active:bg-primary-300',
      disabled,
    },
  },
  outlined: {
    blue: {
      regular: 'bg-transparent border border-solid border-gray-700 text-primary-500',
      hover: 'hover:bg-primary-200',
      focused: 'focus:outline-none focus:bg-primary-200 focus:text-primary-600 focus:border-primary-600',
      active: 'active:bg-primary-200 active:text-primary-600 active:border-gray-700',
      disabled,
    },
    orange: {
      regular: 'bg-transparent border border-solid border-gray-700 text-secondary-400',
      hover: 'hover:bg-secondary-300',
      focused: 'focus:outline-none focus:bg-secondary-300 focus:text-secondary-500 focus:border-secondary-500',
      active: 'active:bg-secondary-300 active:text-secondary-500 active:border-gray-700',
      disabled,
    },
    white: {
      regular: 'bg-transparent border border-solid border-other-white text-other-white',
      hover: 'hover:bg-gray-100 hover:text-primary-500',
      focused: 'focus:bg-gray-100 focus:text-primary-600 focus:border-gray-100',
      active: 'active:bg-other-white active:text-primary-600 active:border-other-white',
      disabled,
    },
  },
  transparent: {
    orange: {
      regular: 'bg-transparent border border-solid border-gray-700 text-p4 text-gray-900 font-normal',
      hover: 'hover:bg-secondary-300',
      focused: 'focus:outline-none focus:bg-secondary-300 focus:border-secondary-300',
      active: 'active:bg-secondary-300 active:border-secondary-300',
      disabled,
    },
  },
  close: {
    grey: {
      regular: 'text-[transparent]',
      hover: 'hover:text-other-white',
    },
  },
};

export const buttonType = {
  outlined: {
    icon: {
      buttonStyle: 'transition-all inline-flex justify-center align-middle flex-col text-p4',
      layoutStyle: `flex justify-center align-middle 
      gap-[8px] self-stretch h-[2.5rem] pt-[10px] pr-[24px] pb-[10px] pl-[16px]`,
    },
    regular: {
      buttonStyle: 'transition-all inline-flex justify-center align-middle flex-col h-[2.5rem] flex-shrink-0 text-p4',
      layoutStyle: `flex justify-center align-middle
      gap-[8px] self-stretch flex-grow flex-shrink-0 flex-basis-0 py-[10px] px-[24px]`,
    },
  },
  transparent: {
    icon: {
      buttonStyle: 'transition-all inline-flex justify-center items-center flex-col flex-shrink-0 text-p4',
      layoutStyle: `flex justify-center items-center
      gap-[8px] self-stretch flex-grow flex-shrink-0 flex-basis-0 py-1.5 px-3`,
    },
    regular: {
      buttonStyle: 'transition-all inline-flex justify-center align-middle flex-col flex-shrink-0 text-p4',
      layoutStyle: `flex justify-center align-middle
      gap-[8px] self-stretch flex-grow flex-shrink-0 flex-basis-0 py-1.5 px-3`,
    },
  },
  filledBold: {
    icon: {
      buttonStyle: 'transition-all inline-flex justify-center align-middle text-p3',
      layoutStyle: 'flex justify-center align-middle gap-[8px] pt-[12px] pr-[24px] pb-[12px] pl-[16px]',
    },
    regular: {
      buttonStyle: 'transition-all inline-flex justify-center align-middle py-[12px] px-[0px] text-p3',
      layoutStyle: 'flex justify-center align-middle gap-[8px] py-[0px] px-[24px] self-stretch',
    },
  },
  tonal: {
    icon: {
      buttonStyle: 'transition-all inline-flex justify-center align-middle text-p3',
      layoutStyle: 'flex justify-center align-middle gap-[8px] pt-[12px] pr-[24px] pb-[12px] pl-[16px]',
    },
    regular: {
      buttonStyle: 'transition-all inline-flex justify-center align-middle py-[12px] px-[0px] text-p3',
      layoutStyle: 'flex justify-center align-middle gap-[8px] py-[0px] px-[24px] self-stretch',
    },
  },
  close: {
    icon: {
      buttonStyle: `flex justify-center align-middle w-[1rem] h-[1rem]  
      flex-shrink-0`,
    },
  },
};
