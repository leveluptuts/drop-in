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
  {
    background: 'black',
    height: 80,
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
    <div className="wrapper" style={{ background: `url(${clouds.default})` }}>
      <header>
        <h1>
          Drop
          <br />
          In
        </h1>
      </header>
      <main>
        <div className="card">
          <DropIn data={activeColors}>
            {activeColors.map(({ background, height }) => (
              <DragItem key={background}>
                <Square background={background} height={height} />
              </DragItem>
            ))}
          </DropIn>
        </div>

        <div className="card">
          <DropIn
            data={activeColors}
            whileHover={{
              scale: 1.02,
              boxShadow: '6px 6px 10px rgba(0, 0, 0, 0.3)',
            }}
            whileTap={{
              scale: 1.04,
              boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.24)',
            }}
          >
            {activeColors.map(({ background, height }) => (
              <DragItem key={background} style={{ borderRadius: 15 }}>
                <Square background={background} height={height} />
              </DragItem>
            ))}
          </DropIn>
        </div>
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Bg</th>
                <th>Height</th>
              </tr>
            </thead>
            <tbody>
              <DropIn
                data={activeColors}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '6px 6px 10px rgba(0, 0, 0, 0.3)',
                }}
                whileTap={{
                  scale: 1.04,
                  boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.24)',
                }}
              >
                {activeColors.map(({ background, height }) => (
                  <DragItem element="tr" key={background}>
                    <td>{background}</td>
                    <td>{height}</td>
                  </DragItem>
                ))}
              </DropIn>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

// <iframe
// src="https://codesandbox.io/embed/brave-einstein-yi1wb?fontsize=14&hidenavigation=1&theme=dark"
// style={{
// 	width: '100%',
// 	height: '100%',
// 	border: 0,
// 	borderRadius: 4,
// 	overflow: 'hidden',
// 	position: 'fixed',
// 	top: 0,
// 	left: 0,
// 	bottom: 0,
// 	right: 0,
// }}
// title="brave-einstein-yi1wb"
// allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
// sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
// ></iframe>

const Square = ({ background, height }) => (
  <div
    style={{
      height,
      marginBottom: 10,
      background: `var(--${background})`,
      borderRadius: 15,
    }}
  />
);

ReactDOM.render(<App />, document.getElementById('root'));
