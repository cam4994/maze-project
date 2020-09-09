document.addEventListener("DOMContentLoaded", () => {
    let rightContainer = document.querySelector('.right_container')
    let navBar = document.getElementById('nav-bar-list')
    let current_user = 0;

    createNavBar()

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
                    <a id="mode1" href="#maze">easy</a>
                    <a id="mode2" href="#maze">medium</a>
                    <a id="mode3" href="#maze">hard</a>
                </div>
            </li>
            <li id="user-icon" style="float:right"><a class="active" href="#user"><img src="./assets/images/avatar.png" alt="Avatar" class="avatar"></a></li>
            `
            let li = document.getElementById('user-icon')
            li.setAttribute("data-id", current_user)
        }
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
            <h1>Sign In</h1>
            <input type="text" name="username" placeholder="Username" autocomplete="off">
            <input type="submit" name="submit" value="Create">
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
        </form>
        `
        rightContainer.append(div)

        let logInForm = document.querySelector('.login-form')
        logInForm.addEventListener('submit', (e) => {
            createOrLoginUser(e, "http://localhost:3000/login")
        })
    }


})