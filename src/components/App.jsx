import React from 'react'
import Canvas from './Canvas'
import Two from 'two.js';

function App() {
    const [gridSize, setGridSize] = React.useState(25);
    const [gridWidth, setGridWidth] = React.useState(20);
    const [gridHeight, setGridHeight] = React.useState(20);
    var w = 600;
    var h = 600;

    // --- Code the created rooms --- // TODO: Move it into external file
    const rooms = [];

    function checkCollision(a, b, padding=0) {
        if (a.x - padding * gridSize < b.x + b.width && 
            a.x + a.width + padding * gridSize > b.x && 
            a.y - padding * gridSize < b.y + b.height && 
            a.y + a.height + padding * gridSize > b.y) {
                return true;
            } 
        return false;
    }

    // Room creation variable
    // TODO: Make these user input
    let targetRoomCount = 10;
    let roomMinSize = 3;
    let roomMaxSize = 7;

    // Creates a set of random rooms we will try to place
    const roomsToPlace = [];
    for(var i = 0; i < targetRoomCount; i++){
        let roomWidth = (Math.floor(Math.random() * (roomMaxSize - roomMinSize)) + roomMinSize) * gridSize;
        let roomHeight = (Math.floor(Math.random() * (roomMaxSize - roomMinSize)) + roomMinSize) * gridSize;
        roomsToPlace.push({
            width: roomWidth,
            height: roomHeight
        });
    }

    let maxTries = 10;
    roomsToPlace.forEach((r) => {
        let placed = false;
        let tries = 0;
        while(!placed && tries < maxTries) {


            // Try to place a room at a random spot
            let valid = true;
            let xPos = Math.floor(Math.random() * gridWidth) * gridSize;
            let yPos = Math.floor(Math.random() * gridHeight) * gridSize;

            // See if room is in bounds
            if(xPos + r.width < gridWidth*gridSize && yPos + r.height < gridHeight*gridSize) {
                let newRoom = {
                    x: xPos,
                    y: yPos,
                    width: r.width,
                    height: r.height
                };

                let collidedRoom = rooms.find(function(room) {
                    return checkCollision(newRoom, room, 1);
                });

                if(collidedRoom != null) {
                    valid = false;
                }
            }
            else {
                valid = false;
            }

            if(valid){
                rooms.push({
                    x: xPos,
                    y: yPos,
                    width: r.width,
                    height: r.height
                });
                placed = true;
            }
            else {
                tries++;
            }
        }
    });

    // --- End of creating rooms --- //


    function changeGridHeight(event) {
        const { name, value } = event.target;

        setGridHeight(value);
    }

    function changeGridWidth(event) {
        const { name, value } = event.target;

        setGridWidth(value);
    }

    function changeGridSize(event) {
        const { name, value } = event.target;

        setGridSize(value);
    }

    // Define a draw function
    // https://two.js.org/#basic-usage
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const draw = (ctx, frameCount) => {
        w = gridSize * gridWidth;
        h = gridSize * gridHeight;

        var two = new Two({
            type: Two.Types.canvas,
            width: w,
            height: h,
            domElement: ctx.canvas
        });

        for(var i = 0; i < w; i+=gridSize) {
            var line = two.makeLine(i, 0, i, h);
            line.stroke = 'DarkGray';
        }

        for(var j = 0; j < h; j+=gridSize) {
            var line = two.makeLine(0, j, w, j);
            line.stroke = 'DarkGray';
        }

        rooms.forEach((r) => {
            // Takes center of rect as it's x/y
            var rect = two.makeRectangle(r.x + (r.width / 2), r.y + (r.height/2), r.width, r.height);
            rect.fill = 'orangered';
            rect.opacity = 0.5;
        });

        // Draw all rooms

          
        two.update();
    }

  return <div>
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
        {/*TODO: Make this a submittable form
            - Maybe make a static canvas size, and just draw the map in it
                to prevent resizing when using range*/}
    <form>
        <label>Height: {gridHeight}</label>
        <input type='range' onChange={changeGridHeight} step='1' min='1' max='50' value={gridHeight}></input>
        <label>Width: {gridWidth}</label>
        <input type='range' onChange={changeGridWidth} step='1' min='1' max='50' value={gridWidth}></input>
    </form>
  </div>;
}

export default App