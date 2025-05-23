import {EventEmitter} from 'events'


const myEmitter = new EventEmitter()

function greenHandler(){
    console.log('Hello world')
}

function goodbyeHandler(){
    console.log('Goodbye world')
}

myEmitter.on('greet',greenHandler)
myEmitter.on('goodbye',goodbyeHandler)

myEmitter.emit('greet')
myEmitter.emit('goodbye')