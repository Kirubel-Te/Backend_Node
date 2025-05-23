import {createServer} from 'http'

const PORT = process.env.PORT

const users = [
    {id: 1, name: 'John Doe'},
    {id: 2, name: 'Jane Doe'},
    {id: 3, name: 'Jim Doe'}
]
const logger = (req,res,next) => {
    console.log(`${req.method} ${req.url}`)
    next()
}


//JSON middleware

const jsonMiddleware = (req,res,next) => {
    res.setHeader('Content-Type','application/json')
    next()
}

//Route handler for GET /api/users
const getusersHandler = (req,res) => {
    res.write(JSON.stringify(users))
    res.end()
}


//Route handler for GET/api/users/:id
const getuserbyIdHandler = (req,res) => {
    const id = req.url.split('/')[3]
    const user = users.find((user)=>user.id === parseInt(id))

    if(user){
        res.write(JSON.stringify(user))
    }else{
        res.statusCode = 404
        res.write(JSON.stringify({message : 'User not found'}))
    }
    res.end()
}

// Route handler for POST /api/users 
const createUserHandler = (req,res) => {
    let body = ''
    req.on('data',(chunk) => {
        body += chunk.toString()
    })
    req.on('end',() => {
        const newUser = JSON.parse(body)
        users.push(newUser)
        res.statusCode = 201
        res.write(JSON.stringify(newUser))
        res.end()
    })
}

const notFoundHandler = (req,res) => {
    res.statusCode = 404
    res.write(JSON.stringify({message : 'Route not found'}))
    res.end()
}

const server = createServer((req,res)=>{
    logger(req,res, () => {
        if(req.url === '/api/users' && req.method === 'GET'){
            getusersHandler(req,res)
        }else if(
            req.url.match(/\/api\/users\/([0-9]+)/)&&
            req.method === 'GET'
        ){
            getuserbyIdHandler(req,res)
        }else if(req.url === '/api/users' && req.method === 'POST'){
            createUserHadler(req,res)
        }else{
            notFoundHandler(req,res)
        }
    })
})


server.listen(PORT , () => {
    console.log(`server running on port ${PORT}`)
})