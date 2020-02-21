import * as restify from 'restify'
import { User } from './users.model'
import { ModelRouter } from '../common/model-router'

class UsersRouter extends ModelRouter<User> {
  constructor() {
    super(User)
    this.on('beforeRender', document => {
      document.password = undefined
    })
  }

  applyRoutes(app: restify.Server): void {
    app.get('/users', this.findAll)
    app.get('/users/:id', [this.validateId, this.findById])
    app.post('/users', this.save)
    app.put('/users/:id', [this.validateId, this.replace])
    app.patch('/users/:id', [this.validateId, this.update])
    app.del('/users/:id', this.delete)
  }
}

export const userRouter = new UsersRouter()
