import React from 'react'

function Form(props){

    const [gridSize, setGridSize] = React.useState(25);
    const [gridWidth, setGridWidth] = React.useState(20);
    const [gridHeight, setGridHeight] = React.useState(20);
    const [targetRoomCount, setTargetRoomCount] = React.useState(10);
    const [roomSize, setRoomSize] = React.useState('reg');
    const [connectivity, setConnectivity] = React.useState('sparse');

    // -- Setting up the room parameters -- //
    function changeTargetRoomCount(event) {
        const { name, value } = event.target;
        setTargetRoomCount(value);
    }

    function changeRoomSize(event) {
        const { name, value } = event.target;
        setRoomSize(value);
    }

    function changeConnectivity(event) {
        const { name, value } = event.target;
        setConnectivity(value);
    }

    function changeGridHeight(event) {
        const { name, value } = event.target;

        // TODO: Re-enable after getting form submission
        setGridHeight(value);
    }

    function changeGridWidth(event) {
        const { name, value } = event.target;

        // TODO: Re-enable after getting form submission
        setGridWidth(value);
    }

    // function changeGridSize(event) {
    //     const { name, value } = event.target;

    //     // TODO: Re-enable after getting form submission
    //     // setGridSize(value);
    // }

    function resize(event) {
        props.changeHeight(gridHeight);
        props.changeWidth(gridWidth);
    }

    function genDungeon() {
        let minSize;
        let maxSize;
        if(roomSize === 'small') {
            minSize = 1;
            maxSize = 5;
        }
        else if(roomSize === 'reg'){
            minSize = 3;
            maxSize = 7;
        }
        else if(roomSize === 'large'){
            minSize = 5;
            maxSize = 10;
        }
        else {
            console.log('error: ' + roomSize);
        }

        props.onGenerate(targetRoomCount, minSize, maxSize, gridWidth, gridHeight, connectivity);
    }

    // TODO: Set reasonable max value for the ranges
    return  <form>
        <label>Height: {gridHeight}</label>
        <input type='range' className="form-range" min='1' max='50' step='1' name='height' onChange={changeGridHeight} value={gridHeight}></input>
        <label>Width: {gridWidth}</label>
        <input type='range' className="form-range" min='1' max='50' step='1' name='width' onChange={changeGridWidth} value={gridWidth}></input>
        

        <label>Max Rooms: {targetRoomCount}</label>
        <input type='range' className="form-range" min='1' max='100' step='1' name='roomCount' onChange={changeTargetRoomCount} value={targetRoomCount}></input>
        <label>Room Sizes: </label>
        <select className="form-select form-select-sm" value={roomSize} onChange={changeRoomSize}>
            <option value='small'>Small (1x1 - 5x5)</option>
            <option value='reg'>Regular (3x3 - 7x7)</option>
            <option value='large'>Large (5x5 - 10x10)</option>
        </select>
        <label>Connectivity: </label>
        <select className="form-select form-select-sm" value={connectivity} onChange={changeConnectivity}>
            {/* Linear = 0.00, Sparse = 0.25, normal = 0.50, dense = 0.75, complete = 1.00 */}
            <option value='linear'>Linear</option>
            <option value='sparse'>Sparse</option>
            <option value='normal'>Normal</option>
            <option value='dense'>Dense</option>
            <option value='complete'>Complete</option>
        </select>
        <button type='button' className='btn btn-secondary' onClick={resize}>Resize</button>
        <button type='button' className='btn btn-primary' onClick={genDungeon}>Generate</button>
    </form>;
}

export default Form;