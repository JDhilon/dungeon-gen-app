import Graph from "./adj-matrix.graph";

class Generator {
    constructor(size = 0) {
        this.size = size;
        this.rooms = [];
        this.paths = new Graph(size);
        this.focusedRoom = -1;
    }

    get rooms() {
        return this.rooms;
    }

    get paths() {
        return this.paths;
    }

    get focusedRoom() {
        return this.focusedRoom;
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

    getMidPoint(room) {
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

                    let collidedRoom = generatedRooms.find(function(room) {
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
    }

    // TODO: Have this generate all paths and add a method for filtering paths instead
    generatePaths() {
        this.rooms.forEach((r1, idx1, ar) => {
            let costs = ar.map((r2, idx2) => {
                return (idx1 === idx2 ? Number.MAX_VALUE : this.distance(this.getMidPoint(r1), this.getMidPoint(r2)));
            })
            
            let minDist = Math.min(...costs);
            let minIndex = costs.indexOf(minDist);
            this.paths.addEdge(idx1, minIndex, Math.floor(minDist));
        });
    }

    unsetFocusedRoom() {
        this.focusedRoom = -1;
    }

    setFocusedRoom(id) {
        this.unsetFocusedRoom();
        this.focusedRoom = id;
    }
}

export default Generator;