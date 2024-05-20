const host = window.location.origin;

async function userLog() {
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value
    let fun = document.getElementById('funSelect').value


    if(fun == 'signup'){
        await fetch(`${host}/signup`,{
            method:'POST',
            body: JSON.stringify({
                "username": username,
                "password": password
            }),
            headers: {
                "Content-type":"application/json"
            }
        })
    }   
    else {
        await fetch(`${host}/login?user=${username}`)
        .then((res) => res.json())
        .then(res => {
            if (res.length > 0){
                if(password == res[0].password){
                localStorage.setItem("username", username)
                localStorage.setItem("password",password)
                localStorage.setItem("user_id",`${res[0].user_id}`)
                window.location.href="mainpage.html"
                }
                else{
                    alert('incorrect password')
                }
            }
            else{
                alert('incorrect username')
            }
        }
        )
    }
}