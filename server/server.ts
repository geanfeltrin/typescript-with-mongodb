import * as restify from 'restify'
import { environment } from '../common/environment'
import mongoose from 'mongoose'
import { Router } from '../common/router'
import { mergePatchBodyParser } from './merge-patch.parser'
import { handleError } from './error.handler'

export class Server {
  app!: restify.Server

  initiallizeDb(): Promise<typeof mongoose> {
    return mongoose.connect(environment.db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initRoutes(routers: Router[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.app = restify.createServer({
          name: 'meat-api',
          version: '1.0.0',
        })

        this.app.use(restify.plugins.queryParser())
        this.app.use(restify.plugins.bodyParser())
        this.app.use(mergePatchBodyParser)

        // routes
        for (const router of routers) {
          router.applyRoutes(this.app)
        }

        this.app.listen(environment.server.port, () => {
          resolve(this.app)
        })
        this.app.on('restifyError', handleError)
      } catch (error) {
        reject(error)
      }
    })
  }

  bootstrap(routers: Router[] = []): Promise<Server> {
    return this.initiallizeDb().then(() =>
      this.initRoutes(routers).then(() => this)
    )
  }
}
