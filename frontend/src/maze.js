document.addEventListener("DOMContentLoaded", () => {
    let rightContainer = document.querySelector('.right_container')
    let createUser = document.getElementById('create-user')
    let loginUser = document.getElementById('login-form')

    createUser.addEventListener('click', addNewUser)
    loginUser.addEventListener('click', addLoginUser)



    function createOrLoginUser(event, url) {
        event.preventDefault()

        let username = event.target.username.value
        let password = event.target.password.value
        // Clear out username and password input boxes 
        event.target.username.value = ''
        event.target.password.value = ''

        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        }
    
        fetch(url, configObj)
            .then(resp => resp.json())
            .then(user=> console.log(user))
    }

    function addNewUser() {
        rightContainer.textContent = ""
        let div = document.createElement('div')
        div.innerHTML=`
        <form class="user-form">
            <h1>Sign In</h1>
            <input type="text" name="username" placeholder="Username" autocomplete="off">
            <input type="password" name="password" placeholder="Password" autocomplete="off">
            <input type="submit" name="submit" value="Create">
        </form>` 
      rightContainer.append(div)

      let createForm = document.querySelector('.user-form')
      createForm.addEventListener('submit', (e)=>{
        createOrLoginUser(e, "http://localhost:3000/users")
    })
    }

    function addLoginUser() {
        rightContainer.textContent = ''
        let div = document.createElement('div')
        div.innerHTML=`
        <form class="login-form">
            <h1>Log In</h1>
            <input type="text" name="username" placeholder="Username" autocomplete="off">
            <input type="password" name="password" placeholder="Password" autocomplete="off">
            <input type="submit" name="submit" value="Log In">
        </form>
        `
        rightContainer.append(div)

        let logInForm = document.querySelector('.login-form')
        logInForm.addEventListener('submit', (e)=>{
            createOrLoginUser(e, "http://localhost:3000/login")
        })
    }


})