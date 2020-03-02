import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { onTop, flat } from './config';

interface Position {
  top: number;
  height: number;
}

// TODO write proper types
// I'm so so sorry for the `any`s
type Props = {
  i: number;
  moveItem: any;
  setPosition: (i: number, offset: Position) => Position;
  onDrop: () => void;
  element?: string;
  whileHover: object;
  whileTap: object;
  style: object;
  dragElastic: number;
  motionPreset: 'tight' | 'wave';
};

const presets = {
  default: {
    type: 'spring',
    damping: 10,
    stiffness: 100,
  },
  tight: {
    type: 'spring',
    damping: 200,
    stiffness: 400,
  },
  slow: {
    type: 'spring',
    damping: 100,
    stiffness: 100,
  },
  wave: {
    type: 'spring',
    damping: 1,
    stiffness: 10,
  },
};

export const Item: React.FC<Props> = ({
  setPosition,
  moveItem,
  i,
  children,
  element = 'div',
  whileHover,
  whileTap,
  style,
  dragElastic,
  onDrop,
  motionPreset,
}) => {
  const [isDragging, setDragging] = useState(false);

  // We'll use a `ref` to access the DOM element that the `motion.li` produces.
  // This will allow us to measure its height and position, which will be useful to
  // decide when a dragging element should switch places with its siblings.
  const ref = useRef(null);

  // By manually creating a reference to `dragOriginY` we can manipulate this value
  // if the user is dragging this DOM element while the drag gesture is active to
  // compensate for any movement as the items are re-positioned.
  const dragOriginY = useMotionValue(0);

  // Update the measured position of the item so we can calculate when we should rearrange.
  useEffect(() => {
    setPosition(i, {
      height: ref.current.offsetHeight,
      top: ref.current.offsetTop,
    });
  });
  const DragItem = motion[element];
  return (
    <DragItem
      ref={ref}
      initial={false}
      animate={isDragging ? onTop : flat}
      whileHover={whileHover}
      whileTap={whileTap}
      drag="y"
      dragOriginY={dragOriginY}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={dragElastic}
      onDragStart={() => setDragging(true)}
      style={style}
      onDragEnd={() => {
        setDragging(false);
        onDrop();
      }}
      onDrag={(_, { point }) => moveItem(i, point.y)}
      positionTransition={({ delta }) => {
        if (isDragging) {
          // If we're dragging, we want to "undo" the items movement within the list
          // by manipulating its dragOriginY. This will keep the item under the cursor,
          // even though it's jumping around the DOM.
          dragOriginY.set(dragOriginY.get() + delta.y);
        }
        const transition = isDragging ? false : presets[motionPreset];
        // If `positionTransition` is a function and returns `false`, it's telling
        // Motion not to animate from its old position into its new one. If we're
        // dragging, we don't want any animation to occur.
        return transition;
      }}
    >
      {children}
    </DragItem>
  );
};
