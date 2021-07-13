import React from 'react'
import Canvas from './Canvas'
import Header from './Header'
import Two from 'two.js';
import Form from './Form'

function App() {
    const [gridSize, setGridSize] = React.useState(25);
    const [gridWidth, setGridWidth] = React.useState(20);
    const [gridHeight, setGridHeight] = React.useState(20);


    var w = 600;
    var h = 600;
    var rooms = [];

    // --- Code the created rooms --- // TODO: Move it into external file
    function checkCollision(a, b, padding=0) {
        if (a.x - padding * gridSize < b.x + b.width && 
            a.x + a.width + padding * gridSize > b.x && 
            a.y - padding * gridSize < b.y + b.height && 
            a.y + a.height + padding * gridSize > b.y) {
                return true;
            } 
        return false;
    }

    function generateRooms(roomCount, minSize, maxSize) {
        const generatedRooms = [];
        // Creates a set of random rooms we will try to place
        const roomsToPlace = [];
        for(var i = 0; i < roomCount; i++){
            let diff = maxSize - minSize;
            let roomWidth = (Math.floor(Math.random() * diff) + minSize) * gridSize;
            let roomHeight = (Math.floor(Math.random() * diff) + minSize) * gridSize;

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

                    let collidedRoom = generatedRooms.find(function(room) {
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
                    generatedRooms.push({
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
        rooms = generatedRooms;
    }

    // --- End of creating rooms --- //
    // rooms = generateRooms(targetRoomCount, roomMinSize, roomMaxSize);

    // Define a draw function
    // https://two.js.org/#basic-usage
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function draw(ctx, frameCount) {
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

         // Draw all rooms
        rooms.forEach((r) => {
            // Takes center of rect as it's x/y
            var rect = two.makeRectangle(r.x + (r.width / 2), r.y + (r.height/2), r.width, r.height);
            rect.fill = 'orangered';
            rect.opacity = 0.5;
        });

        two.update();
    }

    return <div>
        <Header />
        <div className='row'>
            <div className='col'>
                <Form onGenerate={generateRooms}
                    changeWidth={setGridWidth}
                    changeHeight={setGridHeight}
                />
            </div>
            <div className='col'>
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
            </div>
        </div>
  </div>;
}

export default App