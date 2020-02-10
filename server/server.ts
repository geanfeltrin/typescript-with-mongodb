import * as restify from 'restify'
import { environment } from '../common/environment';
import mongoose from 'mongoose';
import { Router } from '../common/router';

export class Server {

  app!: restify.Server

  initiallizeDb() {
   return mongoose.connect(environment.db.url,{
     useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  }

  initRoutes(routers: Router[] = []): Promise<any> {
    return new Promise((resolve, reject) =>{
      try {
        this.app = restify.createServer({
          name: 'meat-api',
          version: '1.0.0'

        })

        this.app.use(restify.plugins.queryParser())

        // routes
        for (const router of routers) {
          router.applyRoutes(this.app)
        }


        this.app.listen(environment.server.port,() => {
          resolve(this.app)
        })

      } catch (error) {
        reject(error)
      }
    })
  }

  bootstrap(routers: Router[] = []): Promise<Server> {
    return this.initiallizeDb().then(() =>
      this.initRoutes(routers).then(() => this
    )
    )
  }
}