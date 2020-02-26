import * as React from 'react';
import { useState, useRef } from 'react';
import move from 'array-move';
import { Item } from './Item';
import { findIndex } from './findIndex';

interface Position {
  top: number;
  height: number;
}

type DropInProps = {
  data: any[];
  children: any[];
  onDrop?: (data: any[]) => void;
  whileHover?: object;
  whileTap?: object;
  dragElastic?: number;
};

export const DropIn = ({
  children,
  onDrop = () => {},
  data,
  whileHover = { scale: 1.03 },
  whileTap = { scale: 1.12 },
  dragElastic = 1,
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
    }
  };

  return newChildren.map((child: any, i: any) => (
    <Item
      dragElastic={dragElastic}
      element={child.props?.element || 'div'}
      style={child.props?.style || {}}
      key={child.key}
      i={i}
      setPosition={setPosition}
      moveItem={moveItem}
      whileHover={whileHover}
      whileTap={whileTap}
      onDrop={() => onDrop(newData)}
    >
      {child}
    </Item>
  ));
};

export * from './DragItem';
