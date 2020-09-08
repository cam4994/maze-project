document.addEventListener("DOMContentLoaded", () => {
    let maze;
    let gate;
    createMaze()
    playGame()

    function playGame(){
        let locationX = gate 
        let locationY = maze.length - 2
        console.log(maze[locationY][locationX])
        document.addEventListener("keydown", moveEmoji)

        function moveEmoji(event) {
            // Stop screen from moving up or down when arrow is clicked
            event.preventDefault()
            if (event.key == "ArrowUp") {
                if (maze[locationY - 1][locationX] == "") {
                    // Move gorilla up
                    maze[locationY - 1][locationX] = "gorilla"
                    // Get rid of gorilla in old position
                    maze[locationY][locationX] = ""
                    // Set new Y position of gorilla, X is unchanged
                    locationY = locationY - 1
                    display()
                }
            } else if (event.key == "ArrowDown") {
                if (maze[locationY + 1][locationX] == "") {
                    // Move gorilla down
                    maze[locationY + 1][locationX] = "gorilla"
                    // Get rid of gorilla in old position
                    maze[locationY][locationX] = ""
                    // Set new Y position of gorilla, X is unchanged
                    locationY = locationY + 1
                    display()
                }
            } else if (event.key == "ArrowLeft") {
                if (maze[locationY][locationX - 1] == "") {
                    // Move gorilla left
                    maze[locationY][locationX - 1] = "gorilla"
                    // Get rid of gorilla in old position
                    maze[locationY][locationX] = ""
                    // Set new X position of gorilla, Y is unchanged
                    locationX = locationX - 1
                    display()
                }
            } else if (event.key == "ArrowRight") {
                if (maze[locationY][locationX + 1] == "") {
                    // Move gorilla right
                    maze[locationY][locationX + 1] = "gorilla"
                    // Get rid of gorilla in old position
                    maze[locationY][locationX] = ""
                    // Set new X position of gorilla, Y is unchanged
                    locationX = locationX + 1
                    display()
                }
            }
        }

        function display() {
            document.getElementById("maze").innerHTML = "";
            for (let i = 0; i < maze.length; i++) {
                let output = "<div>";
                for (let j = 0; j < maze.length; j++) {
                    output += "<b " + maze[i][j] + "></b>";
                }
                output += "</div>";
                document.getElementById("maze").innerHTML += output;
            }
        }
    }
    function createMaze(){

        function generate(dimensions) {
            maze = new Array();
            for (let i = 0; i < dimensions; i++) {
                maze[i] = new Array();

                for (let j = 0; j < dimensions; j++) {
                    maze[i][j] = "";
                }
            }

            addOuterWalls();
            addInnerWalls(true, 1, maze.length - 2, 1, maze.length - 2);
            addEntrance();
            addExit()
        }

        function addOuterWalls() {
            for (let i = 0; i < maze.length; i++) {
                if (i == 0 || i == (maze.length - 1)) {
                    // Top and Bottom Borders
                    for (let j = 0; j < maze.length; j++) {
                        maze[i][j] = "w";
                    }
                } else {
                    // Left and Right Borders
                    maze[i][0] = "w";
                    maze[i][maze.length - 1] = "w";
                }
            }
        }

        function addEntrance() {
            let x = 0;
            //Check to see if there is an open space above entrance, if not move over one space
            for (let i = 1; i < maze.length - 1; i++) {
                if (maze[maze.length - 2][i] == "") {
                    x = i;
                    break;
                }
            }
            gate = x
            maze[maze.length - 1][x] = "g";
        }

        function addExit() {
            let x = 0;
            for (let i = maze.length-1; i > 0; i--) {
                if (maze[1][i] == "") {
                    x = i; 
                    break;
                }
            }
            maze[0][x] = "e"
        }
        function addInnerWalls(h, minX, maxX, minY, maxY) {
            if (h) {

                if (maxX - minX < 2) {
                    return;
                }
                //walls only in even cells
                let y = Math.floor(randomNumber(minY, maxY)/2)*2;
                if (y == 0){
                    y = 2;
                }
                addHWall(minX, maxX, y);

                addInnerWalls(!h, minX, maxX, minY, y - 1);
                addInnerWalls(!h, minX, maxX, y + 1, maxY);
            } else {
                if (maxY - minY < 2) {
                    return;
                }
                //walls only in even cells
                let x = Math.floor(randomNumber(minX, maxX)/2)*2;
                if (x == 0){
                    x = 2;
                }
                addVWall(minY, maxY, x);

                addInnerWalls(!h, minX, x - 1, minY, maxY);
                addInnerWalls(!h, x + 1, maxX, minY, maxY);
            }
        }

        function addHWall(minX, maxX, y) {
            //doors in odd cells
            let hole = Math.floor(randomNumber(minX, maxX) / 2) * 2 + 1;

            for (let i = minX; i <= maxX; i++) {
                if (i == hole) maze[y][i] = "";
                else maze[y][i] = "w";
            }
        }

        function addVWall(minY, maxY, x) {
            //doors in odd cells
            let hole = Math.floor(randomNumber(minY, maxY) / 2) * 2 + 1;

            for (let i = minY; i <= maxY; i++) {
                if (i == hole) maze[i][x] = "";
                else maze[i][x] = "w";
            }
        }

        function randomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        function display() {
            document.getElementById("maze").innerHTML = "";
            maze[maze.length - 2][gate] = "gorilla"
            for (let i = 0; i < maze.length; i++) {
                let output = "<div>";
                for (let j = 0; j < maze.length; j++) {
                    // if (i == maze.length-2 && j == gate) {
                    //     output += "<b class = 'gorilla'></b>"
                    // } else {
                    //     output += "<b " + maze[i][j] + "></b>";
                    // }
                    output += "<b " + maze[i][j] + "></b>";
                }
                output += "</div>";
                document.getElementById("maze").innerHTML += output;
            }
        }
        generate(31);
        display();
    }

})
