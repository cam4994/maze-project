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
            <h3>Create Username</h3>
            <input type="text" name="username" placeholder="Username"/>
            <input type="password" name="password" placeholder="Password"/>
            <button type="submit">Create</button>
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
            <h3>Log In</h3>
            <input type="text" name="username" placeholder="Username"/>
            <input type="password" name="password" placeholder="Password"/>
            <button type="submit">Log In</button>
        </form>
        `
        rightContainer.append(div)

        let logInForm = document.querySelector('.login-form')
        logInForm.addEventListener('submit', (e)=>{
            createOrLoginUser(e, "http://localhost:3000/login")
        })
    }


})