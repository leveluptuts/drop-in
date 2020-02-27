import * as React from 'react';

type ItemProps = {
  itemKey: string;
  element?: string;
};

export const DragItem: React.FC<ItemProps> = ({
  children,
  itemKey,
  element = 'div',
}) => <React.Fragment key={itemKey}>{children}</React.Fragment>;
