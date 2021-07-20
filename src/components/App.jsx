import React from 'react'
import Two from 'two.js'
import RoomData from './RoomData'
import Canvas from './Canvas'
import Header from './Header'
import Form from './Form'
import Graph from '../utils/adj-matrix.graph'
import Map from '../utils/map'

function App() {
    const [gridSize, setGridSize] = React.useState(25);
    const [gridWidth, setGridWidth] = React.useState(20);
    const [gridHeight, setGridHeight] = React.useState(20);
    const [map, setMap] = React.useState(new Map());
    const [selectedRoom, setSelectedRoom] = React.useState(-1);

    var w = 600;
    var h = 600;

    function updateMap(numRooms, minSize, maxSize, mapWidth, mapHeight, connectivity) {
        let m = new Map(numRooms);
        m.generateRooms(minSize, maxSize, mapWidth, mapHeight);
        m.generatePaths(connectivity);
        setMap(m);
        setSelectedRoom(-1);
    }

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

        for(let i = 0; i < w; i+=gridSize) {
            let line = two.makeLine(i, 0, i, h);
            line.stroke = 'DarkGray';
        }

        for(let j = 0; j < h; j+=gridSize) {
            let line = two.makeLine(0, j, w, j);
            line.stroke = 'DarkGray';
        }

         // Draw all rooms
        map.rooms.forEach((r) => {
            // Takes center of rect as it's x/y
            var txt = two.makeText(r.id, r.x * gridSize + gridSize/2, r.y * gridSize + gridSize/2);
            txt.size = gridSize;
            txt.stroke = 'black';
            txt.opacity = 0.75;
            var rect = two.makeRectangle(r.x * gridSize + (r.width * gridSize / 2), r.y * gridSize + (r.height * gridSize/2), r.width * gridSize, r.height * gridSize);
            rect.fill = (r.focused ? 'blue' : 'orangered');
            rect.opacity = 0.5;
        });

        // Show all generated connections
        // Blue for any connections not int MST
        map.paths.matrix.forEach((row, idx1) => {
            row.forEach((cost, idx2) => {
                if(cost !== 0){
                    let room1 = Map.getMidPoint(map.rooms[idx1]);
                    let room2 = Map.getMidPoint(map.rooms[idx2]);
                    let line = two.makeLine(room1[0] * gridSize, room1[1] * gridSize, room2[0] * gridSize, room2[1] * gridSize);
                    line.stroke = (cost === 1 ? 'Black' : 'Blue');
                    line.lineWidth = 10;
                }
            });
        });

        two.update();
    }

    // Checked to see if user clicked on a specific room, and will highlight that room
    function handleClick(event){
        let mouseX = event.nativeEvent.layerX;
        let mouseY = event.nativeEvent.layerY;
        
        let roomClicked = map.rooms.findIndex((r) => {
            return (mouseX > r.x * gridSize && mouseX < r.x * gridSize + r.width * gridSize && mouseY > r.y * gridSize && mouseY < r.y * gridSize + r.height * gridSize);
        });

        if(roomClicked === -1) {
            map.unsetFocusedRoom();
            setSelectedRoom(-1);
        }
        else {
            map.setFocusedRoom(roomClicked);
            setSelectedRoom(roomClicked);
        }
    }

    // temporary function for printing room parameters
    function getRoomParams() {
        let r = map.rooms[selectedRoom];
        return 'id: ' + r.id + '\n ' +
        'x: ' + r.x + '\n ' +
        'y: ' + r.y + '\n ' +
        'height: ' + r.height + '\n ' +
        'width: ' + r.width + '\n ';
    }

    return <div>
        <Header />
        <div className='row'>
            <div className='col'>
                <Form onGenerate={updateMap}
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
            {selectedRoom !== -1 ? <RoomData data={getRoomParams()} /> : null}
            </div>
        </div>
  </div>;
}

export default App

// <p>{focusedRoom ? getRoomParams(focusedRoom) : null}</p>{/*TODO: Make this an actual component that renders underneath canvas*/}