import * as restify from 'restify'


const server = restify.createServer({
  name: 'meat-api',
  version: '1.0.0'

})

server.get('/hello', (req, resp, next)=>{
  resp.json({message :'helo world'})

  return next()
})

server.listen(3000,() => {
  console.log('Api is running on http://localhost:3000')
})