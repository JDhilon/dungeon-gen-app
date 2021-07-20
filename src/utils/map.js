import Graph from "./adj-matrix.graph";

class Map {
    constructor(size = 0) {
        this.size = size;
        this.rooms = [];
        this.paths = new Graph(size);
        this.focusedRoom = -1;
    }

    // AABB collision detection with optional padding
    checkCollision(a, b, padding=0) {
        if (a.x - padding < b.x + b.width && 
            a.x + a.width + padding  > b.x && 
            a.y - padding < b.y + b.height && 
            a.y + a.height + padding > b.y) {
                return true;
            } 
        else {
            return false;
        }
    }

    static getMidPoint(room) {
        return ([room.x+room.width/2, room.y+room.height/2]);
    }

    distance(a, b) {
        return Math.sqrt(((a[0] - b[0]) * (a[0] - b[0])) + ((a[1] - b[1]) * (a[1] - b[1])));
    }

    generateRooms(minSize, maxSize, gridWidth, gridHeight) {
        const generatedRooms = [];
        // Creates a set of random rooms we will try to place
        const roomsToPlace = [];
        for(var i = 0; i < this.size; i++){
            let diff = maxSize - minSize;
            let roomWidth = (Math.floor(Math.random() * diff) + minSize);
            let roomHeight = (Math.floor(Math.random() * diff) + minSize);

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
                let xPos = Math.floor(Math.random() * gridWidth);
                let yPos = Math.floor(Math.random() * gridHeight);

                // See if room is in bounds
                if(xPos + r.width < gridWidth && yPos + r.height < gridHeight) {
                    let newRoom = {
                        x: xPos,
                        y: yPos,
                        width: r.width,
                        height: r.height
                    };

                    let collidedRoom = generatedRooms.find((room) => {
                        return this.checkCollision(newRoom, room, 1);
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
        this.rooms = generatedRooms;
        this.size = roomNum;
    }


    generatePaths() {
        this.paths = new Graph(this.size);
        this.rooms.forEach((r1, idx1, ar) => {
            ar.forEach((r2, idx2) => {
                this.paths.addEdge(idx1, idx2, Math.floor( this.distance(Map.getMidPoint(r1), Map.getMidPoint(r2)) * 100 ) );
            });
        });
    }

    unsetFocusedRoom() {
        if(this.focusedRoom !== -1) {
            this.rooms[this.focusedRoom].focused = false;
            this.focusedRoom = -1;
        }
    }

    setFocusedRoom(id) {
        this.unsetFocusedRoom();
        this.focusedRoom = id;
        this.rooms[id].focused = true;
    }
}

export default Map;