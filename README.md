# @leveluptuts/drop-in

# Drop In

![Jaws Aaron Homoki](https://media.giphy.com/media/kXkLDDRVOPKcU/source.gif)

[![NPM](https://img.shields.io/npm/v/@leveluptuts/fresh?color=82d8d8&logoColor=524763&style=for-the-badge)](https://www.npmjs.com/package/@leveluptuts/fresh)

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

<DropIn data={data}>
  {activeColors.map(({ background, height }) => (
    <DragItem key={background}>
      <Square background={background} height={height} />
    </DragItem>
  ))}
</DropIn>;
```

## API

### DropIn

The parent of an array of components

| Prop     | Type              | Default        | Description                                            |
| -------- | ----------------- | -------------- | ------------------------------------------------------ |
| children | ArrayOfComponents |                | An array of React Components                           |
| data     | ArrayOfData       |                | The data that powers the children                      |
| onDrop   | func              | (data) => data | OPTIONAL \_ function that runs on drop, sends new data |

### DragItem

The item to be moved

| Prop     | Type                 | Default | Description                              |
| -------- | -------------------- | ------- | ---------------------------------------- |
| key      | string               |         | A unique key                             |
| children | Component or Element |         | The thing inside the thing you're moving |

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
