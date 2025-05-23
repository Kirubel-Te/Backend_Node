import fs from 'fs'

// readFile() -callback

const readFiles = async () => {
    try{
        const data = await fs.readFile('./test.txt','utf8')
        console.log(data)
    }catch(error){
        console.log(error)
    }
}

readFiles()