import React from 'react'
import Canvas from './Canvas'
import Header from './Header'
import Two from 'two.js'
import Form from './Form'
import Graph from '../utils/adj-matrix.graph'
import Generator from '../utils/generator'

function App() {
    const [gridSize, setGridSize] = React.useState(25);
    const [gridWidth, setGridWidth] = React.useState(20);
    const [gridHeight, setGridHeight] = React.useState(20);
    const [rooms, setRooms] = React.useState([]);
    const [focusedRoom, setFocusedRoom] = React.useState();

    var w = 600;
    var h = 600;

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

    function getMidPoint(room) {
        return ([room.x+room.width/2, room.y+room.height/2]);
    }

    function distance(a, b) {
        return Math.sqrt(((a[0] - b[0]) * (a[0] - b[0])) + ((a[1] - b[1]) * (a[1] - b[1])));
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
        let roomNum = 0;
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
                        id: roomNum,
                        x: xPos,
                        y: yPos,
                        width: r.width,
                        height: r.height,
                        focused: false
                    });
                    placed = true;
                    roomNum ++;
                }
                else {
                    tries++;
                }
            }
        });

        
        // Made this with useState for now. Stops memory leak with constantly refreshing canvas
        setFocusedRoom();
        generatePaths(generatedRooms);
        setRooms(generatedRooms);
    }

    var g;
    function generatePaths(generatedRooms) {
        g = new Graph(generatedRooms.length);
        generatedRooms.forEach((r1, idx1, ar) => {
            let costs = ar.map((r2, idx2) => {
                return (idx1 === idx2 ? Number.MAX_VALUE : distance(getMidPoint(r1), getMidPoint(r2)));
            })
            
            let minDist = Math.min(...costs);
            let minIndex = costs.indexOf(minDist);
            g.addEdge(idx1, minIndex, Math.floor(minDist));
        });
        
    }

    // --- End of creating rooms --- //
    // rooms = generateRooms(targetRoomCount, roomMinSize, roomMaxSize);

    // Define a draw function
    // https://two.js.org/#basic-usage
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function draw(ctx) {
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
            var txt = two.makeText(r.id, r.x + gridSize/2, r.y + gridSize/2);
            txt.size = gridSize;
            txt.stroke = 'black';
            txt.opacity = 0.75;
            var rect = two.makeRectangle(r.x + (r.width / 2), r.y + (r.height/2), r.width, r.height);
            rect.fill = (r.focused ? 'blue' : 'orangered');
            rect.opacity = 0.5;
        });

        two.update();
    }

    // Checked to see if user clicked on a specific room, and will highlight that room
    function handleClick(event){
        let mouseX = event.nativeEvent.layerX;
        let mouseY = event.nativeEvent.layerY;
        
        let roomClicked = rooms.find((r) => {
            return (mouseX > r.x && mouseX < r.x + r.width && mouseY > r.y && mouseY < r.y + r.height);
        });

        let idToFind;
        if(roomClicked === null || roomClicked === undefined) {
            idToFind = -1;
            setFocusedRoom();
        }
        else {
            idToFind = roomClicked.id;
        }

        setRooms(rooms.map( r => {
            if(idToFind === r.id){
                r.focused = true;
                setFocusedRoom(r);
            } else {
                r.focused = false;
            }

            return r;
        }));
    }

    // temporary function for printing room parameters
    function getRoomParams(r) {
        return 'id: ' + r.id + '\n ' +
        'x: ' + r.x/gridSize + '\n ' +
        'y: ' + r.y/gridSize + '\n ' +
        'height: ' + r.height/gridSize + '\n ' +
        'width: ' + r.width/gridSize + '\n ';
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
                    onClick={handleClick}
                />
                <p>{focusedRoom ? getRoomParams(focusedRoom) : null}</p> {/*TODO: Make this an actual component that renders underneath canvas*/}
            </div>
        </div>
  </div>;
}

export default App