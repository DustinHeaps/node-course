const EventEmitter = require('events');
const http = require('http');

const myEmitter = new EventEmitter();

myEmitter.on('newSale', () => {
  console.log(' 1st new sale!!!')
})

myEmitter.on('newSale', () => {
  console.log('2nd new sale!!!')
})

myEmitter.on('newSale', (stock) => {
  console.log(`there are ${stock} items left in stock`)
})

myEmitter.emit('newSale', 9)

/////////////////////////////

const server = http.createServer();

 server.on('request', (req, res) => res.end('request received'))

 server.on('request', (req, res) => res.end(' another request received'))

 server.on('close', () => console.log('server closed'))

 server.listen(8000, () => {
   console.log('server listening on port 8000')
 })