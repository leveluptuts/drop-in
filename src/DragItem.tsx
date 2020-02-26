import * as React from 'react';

type ItemProps = {
  key: string;
};

export const DragItem: React.FC<ItemProps> = ({ key, children }) => (
  <React.Fragment key={key}>{children}</React.Fragment>
);
