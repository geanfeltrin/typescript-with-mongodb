import { Server } from './server/server';


const server = new Server

server.bootstrap().then(server => {
  console.log('server is listening on:', server.app.address())
}).catch(error => {
  console.log('server failed to start')
  console.error(error)
  process.exit(1)
});
