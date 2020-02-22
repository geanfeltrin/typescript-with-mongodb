import * as restify from 'restify'
import { Restaurant } from './restaurants.model'
import { ModelRouter } from '../common/model-router'
import { NotFoundError } from 'restify-errors'

class RestaurantRouter extends ModelRouter<Restaurant> {
  constructor() {
    super(Restaurant)
  }

  findMenu = (
    req: restify.Request,
    resp: restify.Response,
    next: restify.Next
  ): void => {
    Restaurant.findById(req.params.id, '+menu')
      .then(rest => {
        if (!rest) {
          throw new NotFoundError('Restaurant Not Found')
        } else {
          resp.json(rest.menu)
          return next()
        }
      })
      .catch(next)
  }

  replaceMenu = (
    req: restify.Request,
    resp: restify.Response,
    next: restify.Next
  ): void => {
    Restaurant.findById(req.params.id)
      .then(rest => {
        if (!rest) {
          throw new NotFoundError('Restaurant Not Found')
        } else {
          rest.menu = req.body
          return rest.save()
        }
      })
      .then(rest => {
        resp.json(rest.menu)
        return next()
      })
      .catch(next)
  }

  applyRoutes(app: restify.Server): void {
    app.get('/restaurants', this.findAll)
    app.get('/restaurants/:id', [this.validateId, this.findById])
    app.post('/restaurants', this.save)
    app.put('/restaurants/:id', [this.validateId, this.replace])
    app.patch('/restaurants/:id', [this.validateId, this.update])
    app.del('/restaurants/:id', this.delete)
    app.get('/restaurants/:id/menu', [this.validateId, this.findMenu])
    app.put('/restaurants/:id/menu', [this.validateId, this.replaceMenu])
  }
}

export const restaurantRouter = new RestaurantRouter()
