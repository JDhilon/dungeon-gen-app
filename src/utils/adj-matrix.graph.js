class Graph {

    // Define a graph with a adj matrix with weights = 0
    constructor(size = 1) {
        this.size = size;
        this.matrix = [];
        for (let i = 0; i < size; i++) {
            this.matrix.push([]);
            for (let j = 0; j < size; j++) {
                this.matrix[i][j] = 0;
            }
        }
    }

    // Add an edge, checking first to see if vertices are valid
    addEdge(vertex1, vertex2, weight = 1) {
        if (vertex1 > this.size - 1 || vertex2 > this.size - 1) {
            console.log('invalid vertex');
        } else if (vertex1 === vertex2) {
            this.matrix[vertex1][vertex2] = 0;
            this.matrix[vertex2][vertex1] = 0;
        } else {
            this.matrix[vertex1][vertex2] = weight;
            this.matrix[vertex2][vertex1] = weight;
        }
    }

    // Remove an edge, checking first to see if vertices are valid
    removeEdge(vertex1, vertex2) {
        if (vertex1 > this.size - 1 || vertex2 > this.size - 1) {
            console.log('invalid vertex');
        } else {
            this.matrix[vertex1][vertex2] = 0;
            this.matrix[vertex2][vertex1] = 0;
        } 
    }

    // Add a vertex, update size and adj matrix
    addVertex() {
        this.size++;
        this.matrix.push([]);
        for (let i = 0; i < this.size; i++) {
            this.matrix[i][this.size - 1] = 0;
            this.matrix[this.size - 1][i] = 0;
        }
    }

    // Print values of the matrix
    printMatrix() {
        for (let i = 0; i < this.size; i++) {
            let row = '';
            for (let j = 0; j < this.size; j++) {
                row += ` ${this.matrix[i][j]}`;
            }
            console.log(row);
        }
    }

    // Utility function to find the vertex with minium cost from vertices not in MST
    minKey(keys, mstSet) {
        let min = Number.MAX_VALUE;
        let minIndex = -1;

        for (let i = 0; i < this.size; i++) {
            if (mstSet[i] === false && keys[i] < min) {
                min = keys[i];
                minIndex = i;
            }
        }

        return minIndex;
    }

    // Function to find MST using Prim's Algorithm
    primMST() {
        if(this.size <= 1) {
            return [];
        }

        let parents = [];
        let keys = [];
        let mstSet = [];

        // Initialize all arrays
        for(let i = 0; i < this.size; i++){
            parents.push(0);
            keys.push(Number.MAX_VALUE);
            mstSet.push(false);
        }

        // Set root of MST
        keys[0] = 0;
        parents[0] = -1;

        for(let i = 0; i < this.size - 1; i++) {
            let u = this.minKey(keys, mstSet);
            mstSet[u] = true;

            for(let v = 0; v < this.size; v++) {
                if (this.matrix[u][v] !== 0 && mstSet[v] === false && this.matrix[u][v] < keys[v]) {
                    parents[v] = u;
                    keys[v] = this.matrix[u][v];
                }   
            }
        }

        return parents;
    }

}

export default Graph;