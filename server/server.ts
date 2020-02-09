import * as restify from 'restify'
import { environment } from '../common/environment';

export class Server {
  
  app!: restify.Server

  initRoutes(): Promise<any> {
    return new Promise((resolve, reject) =>{
      try {
        this.app = restify.createServer({
          name: 'meat-api',
          version: '1.0.0'
        
        })
        
        this.app.use(restify.plugins.queryParser())

        //routes
        this.app.get('/info', [(req, resp, next) => {
          if(req.userAgent() && req.userAgent().includes('MSIE 7.0')){
            resp.status(400)
            resp.json({message: 'Please, update your browser'})
            return next(false)
          }
          return next()
        },
          (req, resp, next)=>{
          resp.json({
            browser: req.userAgent(),
            method: req.method,
            url: req.url,
            path: req.path(),
            query: req.query
          })
        
          return next()
        }])

        this.app.listen(environment.server.port,() => {
          resolve(this.app)
        })
        
      } catch (error) {
        reject(error)
      }
    })
  }

  bootstrap(): Promise<Server> {
    return this.initRoutes().then(() => this  
    )
  }
}