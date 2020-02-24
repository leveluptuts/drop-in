import { clamp, distance } from '@popmotion/popcorn';
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import move from 'array-move';

type ItemProps = {
  key: string;
  element?: string;
};

export const DragItem: React.FC<ItemProps> = ({ key, children }) => (
  <React.Fragment key={key}>{children}</React.Fragment>
);

type DropInProps = {
  data: any[];
  children: any[];
  onDrop?: (data: any[]) => void;
};

export const DropIn = ({
  children,
  onDrop = () => null,
  data,
}: DropInProps) => {
  const [newChildren, setNewChildren] = useState(children);
  const [newData, setNewData] = useState(data);
  // We need to collect an array of height and position data for all of this component's
  // `Item` children, so we can later us that in calculations to decide when a dragging
  // `Item` should swap places with its siblings.
  const positions = useRef<Position[]>([]).current;
  React.useEffect(() => {
    setNewChildren(children);
    setNewData(data);
  }, [children, data]);

  const setPosition = (i: number, offset: Position) => (positions[i] = offset);

  // Find the ideal index for a dragging item based on its position in the array, and its
  // current drag offset. If it's different to its current index, we swap this item with that
  // sibling.
  const moveItem = (i: number, dragOffset: number) => {
    const targetIndex = findIndex(i, dragOffset, positions);
    if (targetIndex !== i) {
      const newNewData = move(newData, i, targetIndex);
      setNewChildren((prevState: any) => move(prevState, i, targetIndex));
      setNewData(newNewData);
      onDrop(newNewData);
    }
  };

  return newChildren.map((child: any, i: any) => (
    <Item
      element={child.props?.element || 'div'}
      key={child.key}
      i={i}
      setPosition={setPosition}
      moveItem={moveItem}
    >
      {child}
    </Item>
  ));
};

type Props = {
  i: number;
  moveItem: any;
  setPosition: (i: number, offset: Position) => void;
  element?: string;
};

const Item: React.FC<Props> = ({
  setPosition,
  moveItem,
  i,
  children,
  element = 'div',
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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 1.12 }}
      drag="y"
      dragOriginY={dragOriginY}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={1}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => {
        setDragging(false);
      }}
      onDrag={(e, { point }) => moveItem(i, point.y)}
      positionTransition={({ delta }) => {
        if (isDragging) {
          // If we're dragging, we want to "undo" the items movement within the list
          // by manipulating its dragOriginY. This will keep the item under the cursor,
          // even though it's jumping around the DOM.
          dragOriginY.set(dragOriginY.get() + delta.y);
        }

        // If `positionTransition` is a function and returns `false`, it's telling
        // Motion not to animate from its old position into its new one. If we're
        // dragging, we don't want any animation to occur.
        return !isDragging;
      }}
    >
      {children}
    </DragItem>
  );
};

// Spring configs
const onTop = { zIndex: 1, background: 'white' };
const flat = {
  zIndex: 0,
  transition: { delay: 0.3 },
};

export interface Position {
  top: number;
  height: number;
}

// Prevent rapid reverse swapping
const buffer = 5;

export const findIndex = (
  i: number,
  yOffset: number,
  positions: Position[]
) => {
  let target = i;
  const { top, height } = positions[i];
  const bottom = top + height;

  // If moving down
  if (yOffset > 0) {
    const nextItem = positions[i + 1];
    if (nextItem === undefined) return i;

    const swapOffset =
      distance(bottom, nextItem.top + nextItem.height / 2) + buffer;
    if (yOffset > swapOffset) target = i + 1;

    // If moving up
  } else if (yOffset < 0) {
    const prevItem = positions[i - 1];
    if (prevItem === undefined) return i;

    const prevBottom = prevItem.top + prevItem.height;
    const swapOffset = distance(top, prevBottom - prevItem.height / 2) + buffer;
    if (yOffset < -swapOffset) target = i - 1;
  }

  return clamp(0, positions.length, target);
};
