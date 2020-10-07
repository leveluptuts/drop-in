import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { onTop, flat } from './config';
import { usePositionReorder } from './usePositionReorder';
import { useMeasurePosition } from './useMeasurePosition';

interface Position {
  top: number;
  height: number;
}

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

// TODO write proper types
// I'm so so sorry for the `any`s
type Props = {
  dragElastic: number;
  element?: string;
  i: number;
  motionPreset: 'tight' | 'wave';
  onDrop: () => void;
  style: object;
  updateOrder: any;
  updatePosition: any;
  whileHover: object;
  whileTap: object;
};

export const Item: React.FC<Props> = ({
  children,
  dragElastic,
  element = 'div',
  i,
  motionPreset,
  onDrop,
  style,
  updateOrder,
  updatePosition,
  whileHover,
  whileTap,
}) => {
  const [isDragging, setDragging] = useState(false);
  const ref = useMeasurePosition(pos => updatePosition(i, pos));

  const DragItem = motion[element];
  return (
    <DragItem
      ref={ref}
      layout
      initial={false}
      whileHover={whileHover}
      whileTap={whileTap}
      drag="y"
      dragElastic={dragElastic}
      onDragStart={() => setDragging(true)}
      style={style}
      onDragEnd={() => {
        setDragging(false);
        onDrop();
      }}
      onViewportBoxUpdate={(_viewportBox, delta) => {
        isDragging && updateOrder(i, delta.y.translate);
      }}
    >
      {children}
    </DragItem>
  );
};
