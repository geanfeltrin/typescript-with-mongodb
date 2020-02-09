import { Router } from '../common/router';
import * as restify from 'restify';
import { User } from './users.model';


class UsersRouter extends Router {
  applyRoutes(app: restify.Server) {
    app.get('/users', (req,resp,next) => {
      User.findAll().then(users => {
        resp.json(users)
        return next()
      })
    })
  }
}

export const userRouter = new UsersRouter()