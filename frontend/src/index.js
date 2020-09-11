document.addEventListener("DOMContentLoaded", () => {
    let maze;
    let gate;
    let score;
    let timer;
    let scoreCount;
    let totalSeconds;
    let rightContainer = document.querySelector('.right_container')
    let leftContainer = document.querySelector('.left_container')
    let navBar = document.getElementById('nav-bar-list')
    let current_user = 0;
    let mazeID;
    welcomeMessage()
    createNavBar()

    function createNavBar() {
        navBar.textContent = ''
        if (checkForUser(current_user) == false) {
            // User not signed in 
            navBar.innerHTML = `
            <li id="create-user"><a href="#">New User</a></li>
            <li id="login-form"><a href="#">Login to Play</a></li>
            <li id="leaderboard"><a href="#leaderboard">Leaderboard</a></li>
            <li id="user-icon" style="float:right"><a class="active" href="#user"><img src="./assets/images/avatar.png" alt="Avatar" class="avatar"></a></li>
            `
            let li = document.getElementById('user-icon')
            li.setAttribute("data-id", 0)

            let createUser = document.getElementById('create-user')
            let loginUser = document.getElementById('login-form')
            createUser.addEventListener('click', addNewUser)
            loginUser.addEventListener('click', addLoginUser)
        } else {
            // User is signed in 
            navBar.innerHTML = `
            <li id="leaderboard"><a href="#leaderboard">Leaderboard</a></li>
            <li class="dropdown">
                <a href="javascript:void(0)" class="dropbtn">New Maze</a>
                <div class="dropdown-content">
                    <a id="mode1" href="#maze/">Easy</a>
                    <a id="mode2" href="#maze/">Medium</a>
                    <a id="mode3" href="#maze/">Hard</a>
                </div>
            </li>
            <li id="my-scores"><a href="#scores/">My High Scores</a></li>
            <li id="instructions"><a href="#instructions/">Instructions</a></li>
            <li id="user-icon" style="float:right" class="dropdown">
                <a href="javascript:void(0)" class="dropbtn"><img src="./assets/images/avatar.png" alt="Avatar" class="avatar"></a>
                <div class="dropdown-profile">
                    <a id="edit-user" href="#maze/">Edit Profile</a>
                    <a id="delete-user" href="#maze/">Delete Profile</a>
                </div>
            </li>
            `
            let li = document.getElementById('user-icon')
            li.setAttribute("data-id", current_user)

            document.getElementById('mode1').addEventListener('click', (e) => {
                fetchMaze(1)
            })
            document.getElementById("mode2").addEventListener('click', (e) => {
                fetchMaze(2)
            })
            document.getElementById("mode3").addEventListener('click', (e) => {
                fetchMaze(3)
            })
            document.getElementById("edit-user").addEventListener('click', (e) => {
                editUserForm()
            })
            document.getElementById("delete-user").addEventListener('click', (e) => {
                deleteUserForm()
            })
            document.getElementById("my-scores").addEventListener('click', (e) => {
                showMyScores()
            })
            document.getElementById("instructions").addEventListener('click', (e) => {
                showInstructions()
            })

        }
        document.getElementById('leaderboard').addEventListener('click', showLeaderboard)
    }

    function clearWelcome() {
        const a = document.querySelector('#welcome-message')
        if (a) {
            a.remove()
        }
        rightContainer.innerHTML = ''
    }

    function welcomeMessage() {
        const h1 = document.createElement('h1')
        h1.setAttribute('id', 'welcome-message')
        h1.innerHTML = `<span>W</span><span>E</span><span>L</span><span>C</span><span>O</span><span>M</span><span>E</span><span>!</span><br><span>🐵</span></h1>`
        leftContainer.appendChild(h1)

        const h3 = document.createElement('h3')
        h3.setAttribute('id', 'instruction')
        h3.innerHTML = `
        <h3 id="instruction">Please Login <br>or<br> Create New Username</h3>`
        rightContainer.appendChild(h3)
    }

    function selectMazeText() {
        rightContainer.innerHTML = `
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

    function fetchMaze(id) {
        clearWelcome()
        fetch(`http://localhost:3000/mazes/${id}`)
            .then(resp => resp.json())
            .then(maze => {
                //Save maze ID, create maze and add bananas
                mazeID = maze["id"]
                createMaze(maze["dimensions"])
                addBananas(id)
                addScoreAndTimer()
            })
    }

    function addScoreAndTimer() {
        rightContainer.textContent = ''
        rightContainer.innerHTML = `<br><br>
            <div id="score-container">
            <br>
                <div id ="maze-timer">
                    <i id="alarm-icon" class="material-icons">access_alarm</i>
                    <h2 id="timer-text">Timer</h2>
                    <p id ="timer-display">00:00</p> 
                </div><br>
                <div id ="score">
                    <i id="favorite-icon"  class="material-icons">favorite</i>
                    <h2 id="score-text">Score</h2>
                    <p id ="score-count"></p> <br>
                </div>
            </div>
            <br><br><button id="start-game">Start Game</button><br>
        `
        document.getElementById("start-game").addEventListener("click", startGame)
    }

    function editUserForm() {
        rightContainer.textContent = ""
        let div = document.createElement('div')
        div.innerHTML = `
        <form class="edit-form">
            <h1>Edit Username</h1>
            <input type="text" name="username" placeholder="Username" autocomplete="off">
            <input type="submit" value="Edit">
            <p class="error-message"></p>
        </form>`
        rightContainer.append(div)

        let editForm = document.querySelector('.edit-form')
        editForm.addEventListener('submit', editUser)
    }

    function editUser(event) {
        event.preventDefault()
        let username = event.target.username.value
        let configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "username": username,
            })
        }

        fetch(`http://localhost:3000/users/${current_user}`, configObj)
            .then(resp => resp.json())
            .then(user => {
                // If the user successfully created a username or signed in, it will update the navbar and get rid of the form
                if (checkForUser(user)) {
                    rightContainer.textContent = ""
                    selectMazeText()
                    createNavBar()
                    // If the user gets an error message, it will add the error message to the p element at the end of the form
                } else {
                    let errorMessage = document.querySelector('.error-message')
                    errorMessage.textContent = `${user[0]}`
                }
            })
    }

    function deleteUserForm() {
        rightContainer.textContent = ""
        let div = document.createElement('div')
        div.innerHTML = `
        <form class="delete-form">
            <h1>Are you sure you want to delete your profile?</h1>
            <input type="submit" value="YES">
        </form>`
        rightContainer.append(div)

        let deleteForm = document.querySelector('.delete-form')
        deleteForm.addEventListener('submit', deleteUser)
    }

    function deleteUser() {
        event.preventDefault()
        let configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        }
        fetch(`http://localhost:3000/users/${current_user}`, configObj)

        //After deleting user, set current user to zero and add the instruction to right container
        rightContainer.textContent = ""
        current_user = 0
        const h3 = document.createElement('h3')
        h3.setAttribute('id', 'instruction')
        h3.innerHTML = `
        <h3 id="instruction">Please Login <br>or<br> Create New Username</h3>`
        rightContainer.appendChild(h3)
        createNavBar()
    }

    function showMyScores() {
        fetch(`http://localhost:3000/users/${current_user}`)
            .then(resp => resp.json())
            .then(scores => {
                let username = Object.keys(scores)[0]
                let h1 = document.createElement('h1')
                h1.textContent = `User: ${username}`
                let h2 = document.createElement('h2')
                h2.textContent = "High Scores"
                gameScores = scores[username]
                rightContainer.textContent = ''
                let div = document.createElement('div')
                gameScores.forEach(score => {
                    let gameScore = score[0]
                    let difficulty = score[1]
                    let p = document.createElement('p')
                    p.textContent = `Score: ${gameScore}  Difficulty: ${difficulty}`
                    div.append(p)
                })
                rightContainer.append(h1, h2, div)
            })
    }

    function showInstructions() {
        rightContainer.textContent = ''
        let div = document.createElement('div')
        div.setAttribute('class', 'show-instructions')
        div.innerHTML = `
            <h1 id="instructions-title">🍌INSTRUCTIONS🍌</h1>
            <p>Maze Monkey is a game where the objective is to escape the maze with the highest score possible! You will be controlling a monkey using the four arrow keys (up, down, left and right).</p>
            <p>To play, you must either log in with a previous username or create a new username. Once logged in, you will have the option to select "New Maze" in the navigation bar. A drop down menu will appear giving you the option to select between three difficulties.</p>
            <p>Once a difficulty is selected, the maze will appear along with a timer, a score and a "Start Game" button. The game will not start until you click the "Start Game" button.</p>
            <p>When the game is started, the timer will begin and your score will begin decreasing by 10 points every second. You will begin with 1000 points</p>
            <p>Throughout the maze, there will be randomly placed bananas that will add 300 points to your score. Watch your score, because if it reaches 0, it's game over. </p>
            <p>At any time, you can click "Leaderboard" and see the top scores in the game. If you just want to see your individual high scores, you can click "My High Scores"</p>
            `
        rightContainer.append(div)
    }

    function showLeaderboard() {
        rightContainer.textContent = ''
        // Create easy, medium and hard buttons
        let easyButton = document.createElement('button')
        easyButton.setAttribute('id', 'easy-button')
        easyButton.textContent = "Easy"
        easyButton.addEventListener("click", (e) => {
            filterHighScores("easy")
        })
        let mediumButton = document.createElement('button')
        mediumButton.setAttribute('id', 'medium-button')
        mediumButton.textContent = "Medium"
        mediumButton.addEventListener("click", (e) => {
            filterHighScores("medium")
        })
        let hardButton = document.createElement('button')
        hardButton.setAttribute('id', 'hard-button')
        hardButton.textContent = "Hard"
        hardButton.addEventListener("click", (e) => {
            filterHighScores("hard")
        })

        let h1 = document.createElement('h1')
        h1.setAttribute('id', 'leaderboard-text')
        h1.textContent = "🍌LEADERBOARD🍌"
        rightContainer.append(h1, easyButton, mediumButton, hardButton)

        // Display High Scores
        fetchHighScores("http://localhost:3000/scores")
    }

    function filterHighScores(difficulty) {
        document.querySelector('#leaderboard-table').remove()
        fetchHighScores(`http://localhost:3000/scores/${difficulty}`)
    }

    function fetchHighScores(url) {
        fetch(url)
            .then(resp => resp.json())
            .then(scores => displayScores(scores))
    }

    function leaderboardTable() {
        let table = document.createElement('table')
        table.setAttribute('id', 'leaderboard-table')
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Uername</th>
                    <th>Score</th>
                    <th>Difficulty</th>
                </tr>
            </thead>
            <tbody id="table-body">
            </tbody>`
        rightContainer.appendChild(table)
    }

    function displayScores(scores) {
        leaderboardTable()
        let table = document.querySelector('#leaderboard-table')
        var i = 0
        scores.forEach(score => {
            let username = Object.keys(score)[0]
            let userScore = score[username][0]
            let difficulty = score[username][1]
            i += 1
            let tableBody = document.querySelector('#table-body')
            let tr = document.createElement('tr')
            tr.innerHTML = `
                        <td>${i}</td>
                        <td>${username}</td>
                        <td>${userScore}</td>
                        <td>${difficulty}</td>`

            tableBody.appendChild(tr)
        });
        rightContainer.append(table)
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
                // If the user successfully created a username or signed in, it will update the navbar and get rid of the form
                if (checkForUser(user)) {
                    rightContainer.textContent = ""
                    selectMazeText()
                    createNavBar()
                    // If the user gets an error message, it will add the error message to the p element at the end of the form
                } else {
                    let errorMessage = document.querySelector('.error-message')
                    errorMessage.textContent = `${user[0]}`
                }
            })
    }

    function addNewUser() {
        rightContainer.textContent = ""
        let div = document.createElement('div')
        div.innerHTML = `
        <form class="user-form">
            <h1>Create Username</h1>
            <input type="text" name="username" placeholder="Username" autocomplete="off">
            <input type="submit" name="submit" value="Create">
            <p class="error-message"></p>
        </form>`
        rightContainer.append(div)

        let createForm = document.querySelector('.user-form')
        createForm.addEventListener('submit', (e) => {
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
            <p class="error-message"></p>
        </form>
        `
        rightContainer.append(div)

        let logInForm = document.querySelector('.login-form')
        logInForm.addEventListener('submit', (e) => {
            createOrLoginUser(e, "http://localhost:3000/login")
        })
    }


    function startGame() {
        timerCount()
        keepScore()
        playGame()
        bgMusic()
        //Get rid of start button once game starts
        document.getElementById("start-game").remove()

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
            tickTock()
        }

        function keepScore() {
            score = 1000
            document.getElementById('score-count').innerHTML = score;
            scoreCount = setInterval(function () {
                if (score > 0) {
                    score -= 1;
                }
                document.getElementById('score-count').innerHTML = score;
                if (score == 0) {
                    loseGame()
                }
            }, 100);
        }

        function bgMusic() {
            bg = document.querySelector('#music')
            bg.volume = 0.8;
            bg.play()
        }

        function tickTock() {
            clk = document.querySelector('#time')
            clk.volume = 0.5;
            clk.play()
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
                } else if (maze[locationY - 1][locationX] == "w") {
                    document.querySelector('#wall').play()
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
                } else if (maze[locationY + 1][locationX] == "w") {
                    document.querySelector('#wall').play()
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
                } else if (maze[locationY][locationX - 1] == "w") {
                    document.querySelector('#wall').play()
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
                } else if (maze[locationY][locationX + 1] == "w") {
                    document.querySelector('#wall').play()
                }
            }
        }

        function addToScore() {
            score += 300;
            item = document.querySelector('#get')
            item.volume = 0.2;
            item.play()
            display()

            let div = document.querySelector('#score')
            let p = document.createElement('p')
            p.textContent = "+300"
            p.setAttribute('class', 'add-to-score')
            div.append(p)
            fade(p)
        }

        function fade(element) {
            // initial opacity
            let opac = 1
            let fadeTimer = setInterval(function () {
                if (opac <= 0.1) {
                    clearInterval(fadeTimer);
                    element.style.display = 'none';
                }
                element.style.opacity = opac;
                element.style.filter = 'alpha(opacity=' + opac * 100 + ")";
                opac -= opac * 0.1;
            }, 70);
        }

        function winGame() {
            //Stop timer and score from counting
            clearInterval(timer)
            clearInterval(scoreCount)
            document.querySelector('#music').pause()
            document.querySelector('#time').pause()
            document.querySelector('#win').play()
            congratsMessage()
            saveGame()
        }
    }

    function congratsMessage() {
        let div = document.createElement('div')
        div.setAttribute('class', 'modal')
        div.innerHTML = `
        <div class="modal-container">
        <p class="modal-image">🙊</p>
            <p> Congratulations! </p>
            <p> Your Score is ${score}</p>
            <a class="close">Close</a><br>
        </div>`
        leftContainer.appendChild(div)
    }

    function loseMessage() {
        let div = document.createElement('div')
        div.setAttribute('class', 'modal')
        div.innerHTML = `
        <div class="modal-container">
        <p class="modal-image">🙊</p>
            <p> Sorry! This maze was too tough!</p>
            <p> Your Score is ${score}</p>
            <a class="close">Close</a><br>
        </div>`
        leftContainer.appendChild(div)
    }

    function saveGame() {
        //Create a post to Scores
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "user_id": current_user,
                "maze_id": mazeID,
                "time": totalSeconds,
                "score": score
            })
        }

        fetch("http://localhost:3000/scores", configObj)
            .then(resp => resp.json())
            .then(score => console.log(score))
    }

    function loseGame() {
        //Stop timer and score from counting
        clearInterval(timer)
        clearInterval(scoreCount)
        document.querySelector('#music').pause()
        document.querySelector('#time').pause()
        document.querySelector('#lose').play()
        loseMessage()
        saveGame()
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

    function addBananas(maze_id) {
        let number;
        if (maze_id == 1) {
            number = 8
        } else if (maze_id == 2) {
            number = 11
        } else {
            number = 14
        }

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
