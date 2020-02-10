import { Router } from '../common/router';
import * as restify from 'restify';
import { User } from './users.model';


class UsersRouter extends Router {
  applyRoutes(app: restify.Server) {

    app.get('/users', (req,resp,next) => {
      User.find().then(users => {
        resp.json(users)
        return next()
      })
    })

    app.get('/users/:id', (req,resp,next)=> {
      User.findById(req.params.id).then(user => {
        if(user){

          resp.json(user)
          return next()
        }
        resp.send(404)
        return next()
      })
    })

    app.post('/users', (req, resp,next) => {
      const user = new User(req.body)


      user.save().then(user => {
        user.password = 'undefined'
        resp.json(user)
        return next()
      })

    })

  }
}

export const userRouter = new UsersRouter()