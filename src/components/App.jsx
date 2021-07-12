import React from 'react'
import Canvas from './Canvas'
import Two from 'two.js';

function App() {

    const minGridStep = 15;
    const [grid, setGrid] = React.useState(25);
    const w = 600;
    const h = 600;

    function changeGrid(event) {
        const { name, value } = event.target;

        setGrid(prev => {
            if(name === 'up') {
                return Math.max(prev - 5, minGridStep);
            }
            else if (name === 'down') {
                return Math.min(prev + 5, Math.min(w, h));
            }
        });
    }

    // Define a draw function
    // https://two.js.org/#basic-usage
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const draw = (ctx, frameCount) => {
        var two = new Two({
            type: Two.Types.canvas,
            width: w,
            height: h,
            domElement: ctx.canvas
        });

        for(var i = 0; i < w; i+=grid) {
            var line = two.makeLine(i, 0, i, h);
        }

        for(var i = 0; i < h; i+=grid) {
            var line = two.makeLine(0, i, w, i);
        }
          
        two.update();
    }

  return <div>
    <h1>Hello world!</h1>
    <Canvas 
        draw={draw} 
        options={{
            context: '2d'
            }}
        style={{
            borderStyle: 'solid'
        }}
        width={w}
        height={h}
        />
    <button type='button' name='down' onClick={changeGrid}>-</button>
    <button type='button' name='up' onClick={changeGrid}>+</button>
  </div>;
}

export default App