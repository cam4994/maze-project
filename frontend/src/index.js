document.addEventListener("DOMContentLoaded", () => {
    let maze;
    let gate;
    let score;
    let timer;
    let scoreCount;
    let totalSeconds;
    let setting;
    let rightContainer = document.querySelector('.right_container')
    let leftContainer = document.querySelector('.left_container')
    let navBar = document.getElementById('nav-bar-list')
    let current_user = 0;
    createNavBar() 
    welcomeMessage()

    function createNavBar() {
        // If there is a current user signed in
        navBar.textContent = ''
        if (checkForUser(current_user) == false) {
            navBar.innerHTML = `
            <li id="create-user"><a href="#">New User</a></li>
            <li id="login-form"><a href="#">Login to Play</a></li>
            <li><a href="#leaderboard">Leaderboard</a></li>
            <li id="user-icon" style="float:right"><a class="active" href="#user"><img src="./assets/images/avatar.png" alt="Avatar" class="avatar"></a></li>
            `
            let li = document.getElementById('user-icon')
            li.setAttribute("data-id", 0)

            let createUser = document.getElementById('create-user')
            let loginUser = document.getElementById('login-form')
            createUser.addEventListener('click', addNewUser)
            loginUser.addEventListener('click', addLoginUser)
        } else {
            navBar.innerHTML = `
            <li><a href="#leaderboard">Leaderboard</a></li>
            <li class="dropdown">
                <a href="javascript:void(0)" class="dropbtn">New Maze</a>
                <div class="dropdown-content">
                    <a id="mode1" href="#maze/">easy</a>
                    <a id="mode2" href="#maze/">medium</a>
                    <a id="mode3" href="#maze/">hard</a>
                </div>
            </li>
            <li id="user-icon" style="float:right"><a class="active" href="#user"><img src="./assets/images/avatar.png" alt="Avatar" class="avatar"></a></li>
            `
            let li = document.getElementById('user-icon')
            li.setAttribute("data-id", current_user)

                document.getElementById('mode1').addEventListener('click', (e) => {
                    console.log("lkjda;sflkja;dlskj")
                    clearWelcome()
                    setting = 17;
                    createMaze(setting)
                    showScoreContainer()
                    addBananas()
                })
                document.getElementById("mode2").addEventListener('click', (e) => {
                    clearWelcome()
                    setting = 25;
                    showScoreContainer()
                    createMaze(setting)
                    addBananas()
                })
                document.getElementById("mode3").addEventListener('click', (e) => {
                    clearWelcome()
                    setting = 31;
                    showScoreContainer()
                    createMaze(setting)
                    addBananas()
                })
        }
    }

    function clearWelcome(){
        const a = document.querySelector('#welcome-message')
        if (a){
        a.remove()}
        rightContainer.innerHTML=''
    }

    function welcomeMessage(){
        const h1 = document.createElement('h1')
        h1.setAttribute('id', 'welcome-message')
        h1.innerHTML=`<span>W</span><span>E</span><span>L</span><span>C</span><span>O</span><span>M</span><span>E</span><span>!</span></h1>`
        leftContainer.appendChild(h1)
    
        const h3 = document.createElement('h3')
        h3.setAttribute('id', 'instruction')
        h3.innerHTML=`
        <h3 id="instruction">Please Login <br>or<br> Create New Username</h3>`
        rightContainer.appendChild(h3)
    }

    function showScoreContainer(){
        const div = document.createElement('div')
        div.setAttribute('id', 'score-container')
        div.innerHTML=`<br>
            <button id="start-game">Start Game</button>
            <div id="maze-timer">
            <h2>Timer</h2>
            <p id="timer-display">00:00</p>
            </div><br>
            <div id="score">
            <h2>Score</h2>
            <p id="score-count"></p>
            </div>`
        rightContainer.appendChild(div)
        document.getElementById("start-game").addEventListener("click", startGame)
    }

    function checkForUser(user) {
        if (user["id"]) {
            current_user = user["id"]
            return true
        } else if (!user["id"] && user > 0) {
            return true
        } else {
            return false
        }
    }

    function createOrLoginUser(event, url) {
        event.preventDefault()

        let username = event.target.username.value
        // Clear out username
        event.target.username.value = ''

        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "username": username,
            })
        }

        fetch(url, configObj)
            .then(resp => resp.json())
            .then(user => {
                checkForUser(user)
                createNavBar()
            })
            
    }

    function addNewUser() {
        rightContainer.textContent = ""
        let div = document.createElement('div')
        div.innerHTML = `
        <form class="user-form">
            <h1>Create User</h1>
            <input type="text" name="username" placeholder="Username" autocomplete="off">
            <input type="submit" name="submit" value="Create">
        </form>` 
      rightContainer.append(div)

        let createForm = document.querySelector('.user-form')
        createForm.addEventListener('submit', (e) => {
            rightContainer.innerHTML = ''
            selectMazeText()
            createOrLoginUser(e, "http://localhost:3000/users")
        })
    }

    function addLoginUser() {
        rightContainer.textContent = ''
        let div = document.createElement('div')
        div.innerHTML = `
        <form class="login-form">
            <h1>Log In</h1>
            <input type="text" name="username" placeholder="Username" autocomplete="off">
            <input type="submit" name="submit" value="Log In">
        </form>
        `
        rightContainer.append(div)

        let logInForm = document.querySelector('.login-form')
        logInForm.addEventListener('submit', (e) => {
            rightContainer.innerHTML = ''
            selectMazeText()
            createOrLoginUser(e, "http://localhost:3000/login")
        })
    }

    function selectMazeText(){
        rightContainer.innerHTML=`
        <h1 id="select-maze">
        <span>↖</span>
        <span>S</span>
        <span>E</span>
        <span>L</span>
        <span>E</span>
        <span>C</span>
        <span>T</span>
      </br>
        <span>M</span>
        <span>A</span>
        <span>Z</span>
        <span>E</span>
      </h1>`
    }

    function startGame() {
        timerCount()
        keepScore()
        playGame()
        function timerCount() {
            let sec = 0;
            let min = 0;
            timer = setInterval(function () {
                sec += 1;
                if (sec == 60) {
                    sec = 0;
                    min += 1;
                }
                if (sec < 10) {
                    sec = `0${sec}`
                }
                if (min < 10) {
                    min = `0${min}`
                }
                document.getElementById('timer-display').innerHTML = `${min}:${sec}`;
                sec = parseInt(sec);
                min = parseInt(min);
                totalSeconds = (min * 60) + sec;
            }, 1000);
        }

        function keepScore() {
            score = 1000
            scoreCount = setInterval(function () {
                document.getElementById('score-count').innerHTML = score;
                score -= 2;
            }, 100);
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

    function playGame() {
        let locationX = gate
        let locationY = maze.length - 2
        document.addEventListener("keydown", moveEmoji)

        function moveEmoji(event) {
            // Stop screen from moving up or down when arrow is clicked
            if (event.key == "ArrowUp") {
                event.preventDefault()
                if (maze[locationY - 1][locationX] == "") {
                    // Move gorilla up
                    maze[locationY - 1][locationX] = "gorilla"
                    // Get rid of gorilla in old position
                    maze[locationY][locationX] = ""
                    // Set new Y position of gorilla, X is unchanged
                    locationY = locationY - 1
                    display()
                    // Check if the gorilla makes it to the exit
                } else if (maze[locationY - 1][locationX] == "e") {
                    // Move gorilla up
                    maze[locationY - 1][locationX] = "gorilla"
                    // Get rid of gorilla in old position
                    maze[locationY][locationX] = ""
                    // Set new Y position of gorilla, X is unchanged
                    locationY = locationY - 1
                    display()
                    winGame()
                    //Check if gorilla is moving to a banana square
                } else if (maze[locationY - 1][locationX] == "banana") {
                    // Move gorilla up
                    maze[locationY - 1][locationX] = "gorilla"
                    // Get rid of gorilla in old position
                    maze[locationY][locationX] = ""
                    // Set new Y position of gorilla, X is unchanged
                    locationY = locationY - 1
                    addToScore()
                }
            } else if (event.key == "ArrowDown") {
                event.preventDefault()
                if (maze[locationY + 1][locationX] == "") {
                    // Move gorilla down
                    maze[locationY + 1][locationX] = "gorilla"
                    // Get rid of gorilla in old position
                    maze[locationY][locationX] = ""
                    // Set new Y position of gorilla, X is unchanged
                    locationY = locationY + 1
                    display()
                } else if (maze[locationY + 1][locationX] == "banana") {
                    // Move gorilla down
                    maze[locationY + 1][locationX] = "gorilla"
                    // Get rid of gorilla in old position
                    maze[locationY][locationX] = ""
                    // Set new Y position of gorilla, X is unchanged
                    locationY = locationY + 1
                    addToScore()
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
                } else if (maze[locationY][locationX - 1] == "banana") {
                    // Move gorilla left
                    maze[locationY][locationX - 1] = "gorilla"
                    // Get rid of gorilla in old position
                    maze[locationY][locationX] = ""
                    // Set new X position of gorilla, Y is unchanged
                    locationX = locationX - 1
                    addToScore()
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
                } else if (maze[locationY][locationX + 1] == "banana") {
                    // Move gorilla right
                    maze[locationY][locationX + 1] = "gorilla"
                    // Get rid of gorilla in old position
                    maze[locationY][locationX] = ""
                    // Set new X position of gorilla, Y is unchanged
                    locationX = locationX + 1
                    addToScore()
                }
            }
        }

        function addToScore() {
            score += 200;
            // document.getElementById('score-count').innerHTML = score;
            display()
        }

        function winGame() {
            //Stop timer and score from counting
            clearInterval(timer)
            clearInterval(scoreCount)
            saveGame()
        }

        function saveGame() {
            //Create a post to Scores
            let current_player = getElementById('user-icon')
            let userID = current_player.dataset.id
            // let mazeID = 

            let configObj = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    "user_id": userID,
                    "maze_id": mazeID,
                    "time": totalSeconds,
                    "score": score
                })
            }

            fetch("http://localhost:3000/scores", configObj)
                .then(resp => resp.json())
                .then(score => console.log(score))
        }
    }
    function createMaze(setting) {

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
            for (let i = maze.length - 1; i > 0; i--) {
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
                let y = Math.floor(randomNumber(minY, maxY) / 2) * 2;
                if (y == 0) {
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
                let x = Math.floor(randomNumber(minX, maxX) / 2) * 2;
                if (x == 0) {
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
        generate(setting);
        display();
    }

    function addBananas() {
        let number = 8
        for (let i = 0; i < number; i++) {
            let y = 0
            let x = 0
            while (maze[y][x] != "") {
                y = randomNumber(1, maze.length - 2)
                x = randomNumber(1, maze.length - 2)
            }
            maze[y][x] = "banana"
        }

        function randomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        display()
    }
})
