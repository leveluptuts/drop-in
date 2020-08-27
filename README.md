# @leveluptuts/drop-in

# Drop In

![Jaws Aaron Homoki](https://media.giphy.com/media/kXkLDDRVOPKcU/source.gif)

[![NPM](https://img.shields.io/npm/v/@leveluptuts/drop-in?color=82d8d8&logoColor=524763&style=for-the-badge)](https://www.npmjs.com/package/@leveluptuts/drop-in)

## Demo

https://levelup-drop-in.netlify.com/

## Install

```bash
yarn add @leveluptuts/drop-in
```

## Usage

### The Syntax

```jsx
import { DropIn, DragItem } from '@leveluptuts/drop-in';

function Component() {
  return (
    <DropIn data={data}>
      {activeColors.map(({ background, height }) => (
        <DragItem key={background}>
          <Square background={background} height={height} />
        </DragItem>
      ))}
    </DropIn>
  );
}
```

### More options

```jsx
import { DropIn, DragItem } from '@leveluptuts/drop-in';

function Component() {
  return (
    <DropIn data={data} whileHover={{ scale: 1.02 }} whileTap={{ scale: 1.04 }}>
      {activeColors.map(({ background, height }) => (
        <DragItem key={background}>
          <Square background={background} height={height} />
        </DragItem>
      ))}
    </DropIn>
  );
}
```

## API

### DropIn

The parent of an array of components

| Prop       | Type              | Default         | Description                                            |
| ---------- | ----------------- | --------------- | ------------------------------------------------------ |
| children   | ArrayOfComponents |                 | An array of React Components                           |
| data       | ArrayOfData       |                 | The data that powers the children                      |
| onDrop     | func              | (data) => data  | OPTIONAL \_ function that runs on drop, sends new data |
| whileTap   | Framer Property   | { scale: 1.12 } | OPTIONAL \_ object that sets the animation state       |
| whileHover | Framer Property   | { scale: 1.03 } | OPTIONAL \_ object that sets the animation state       |

### DragItem

The item to be moved

| Prop     | Type                      | Default | Description                               |
| -------- | ------------------------- | ------- | ----------------------------------------- |
| key      | string                    |         | A unique key                              |
| children | Component or Element      |         | The thing inside the thing you're moving  |
| element  | dom element for drag item | 'div'   | A string of the dom element being dragged |

## FAQ

## Contributing

`yarn`
`yarn start`

#### (in another tab) to run example

`cd example`
`yarn`
`yarn start`

## Prior Art and Inspirations

Lots of this code has been adopted from https://codesandbox.io/s/framer-motion-drag-to-reorder-r4qme

## License

MIT © [leveluptuts](https://github.com/leveluptuts)
