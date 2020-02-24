import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DropIn, DragItem } from '../.';
import './style.css';
import * as clouds from './cloud.png';

const COLORS = [
  {
    background: 'red',
    height: 30,
  },
  {
    background: 'blue',
    height: 60,
  },
  {
    background: 'green',
    height: 90,
  },
  {
    background: 'purp',
    height: 40,
  },
];

const POSSIBLE_HEIGHTS = [30, 60, 90, 140, 100, 60];
const POSSIBLE_COLORS = ['red', 'green', 'blue', 'purp', 'teal', 'black'];

const App = () => {
  const [activeColors, setActiveColors] = React.useState(COLORS);
  const addNewColor = () => {
    setActiveColors(prevColors => {
      var index = Math.floor(Math.random() * POSSIBLE_HEIGHTS.length);
      return [
        ...prevColors,
        {
          background: POSSIBLE_COLORS[index],
          height: POSSIBLE_HEIGHTS[index],
        },
      ];
    });
  };
  return (
    <div
      style={{
        background: `url(${clouds.default})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
      <header>
        <h1>
          Drop
          <br />
          In
        </h1>
      </header>
      <main
        style={{
          padding: '40px',
          background: 'white',
          boxShadow: '4px 4px 15px rgba(0, 0, 0, 0.2)',
          borderRadius: '35px',
          margin: '0 auto',
          width: '95%',
          maxWidth: 600,
        }}
      >
        {/*<button onClick={addNewColor}>Add Random Color Box</button>*/}
        <DropIn data={activeColors}>
          {activeColors.map(({ background, height }) => (
            <DragItem key={background}>
              <Square background={background} height={height} />
            </DragItem>
          ))}
        </DropIn>
      </main>
    </div>
  );
};

const Square = ({ background, height }) => (
  <div
    style={{
      background: `var(--${background})`,
      height,
      borderRadius: 15,
      marginBottom: 10,
    }}
  />
);

ReactDOM.render(<App />, document.getElementById('root'));
