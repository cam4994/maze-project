document.addEventListener("DOMContentLoaded", () => {
    let createForm = document.querySelector('.user-form')
    let logInForm = document.querySelector('.login-form')

    createForm.addEventListener('submit', (e)=>{
        createOrLoginUser(e, "http://localhost:3000/users")
    })
    logInForm.addEventListener('submit', (e)=>{
        createOrLoginUser(e, "http://localhost:3000/login")
    })

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
})