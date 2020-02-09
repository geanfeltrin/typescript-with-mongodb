import { Server } from './server/server';
import { userRouter } from './users/users.router';


const server = new Server

server.bootstrap([userRouter]).then(server => {
  console.log('server is listening on:', server.app.address())
}).catch(error => {
  console.log('server failed to start')
  console.error(error)
  process.exit(1)
});
