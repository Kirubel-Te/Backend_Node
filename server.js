import http from 'http'
import fs from 'fs/promises'
import path from 'path'
import url from 'url'
import { error } from 'console';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT

const server = http.createServer(async(req,res) => {
    let filepath;
    if(req.url === '/'){
        filepath = path.join(__dirname,'public','index.html')
    }else if(req.url === '/about'){
        filepath = path.join(__dirname,'public','about.html')
    }else{
        throw new Error('Method not allowed')
    }

    const data = await fs.readFile(filepath)
    res.setHeader('Content-Type','text/html')
    res.write(data)
    res.end()
})


server.listen(PORT, () => {
    console.log('server running in port 8000')
})