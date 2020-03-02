// Spring configs
export const onTop = {
  zIndex: 1,
  transition: {
    stiffness: 10,
    damping: 200,
  },
};
export const flat = {
  zIndex: 0,
  transition: { delay: 0.3, stiffness: 10, damping: 200 },
};

// Prevent rapid reverse swapping
export const buffer = 5;
