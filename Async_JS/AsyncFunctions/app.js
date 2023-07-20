
//===================
// ASYNC FUNCTIONS 
//===================
//  A newer and cleaner syntax for working with async code!
// Syntax "makeup" for promises

//===================
// The async keyword
//===================
// Async functions always return a promise
// if the function returns a value, the promise will be resloved with that value
// if the function throws an exception, the promise will be rejected 

// async function hello() {
// }




async function sing() {
    throw "OH NO, PROBLEM!"
    return 'LA LA LA LA'
}

sing()
    .then(data => {
        console.log("PROMISE RESOLVED WITH:", data)
    })
    .catch(err => {
        console.log("OH NO, PROMISE REJECTED!")
        console.log(err)
    })




const login = async (username, password) => {
    if (!username || !password) throw 'Missing Credentials'
    if (password === 'corgifeetarecute') return 'WELCOME!'
    throw 'Invalid Password'
}

login('todd', 'corgifeetarecute')
    .then(msg => {
        console.log("LOGGED IN!")
        console.log(msg)
    })
    .catch(err => {
        console.log("ERROR!")
        console.log(err)
    })

