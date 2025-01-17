import { Router } from './router'
import mongoose from 'mongoose'
import { NotFoundError } from 'restify-errors'

export abstract class ModelRouter<D extends mongoose.Document> extends Router {
  constructor(protected model: mongoose.Model<D>) {
    super()
  }

  validateId = (req: any, resp: any, next: any): void => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      next(new NotFoundError('Document not found'))
    } else {
      next()
    }
  }

  findAll = (req: any, resp: any, next: any): void => {
    this.model
      .find()
      .then(this.renderAll(resp, next))
      .catch(next)
  }

  findById = (req: any, resp: any, next: any): void => {
    this.model
      .findById(req.params.id)
      .then(this.render(resp, next))
      .catch(next)
  }

  save = (req: any, resp: any, next: any): void => {
    const document = new this.model(req.body)
    document
      .save()
      .then(this.render(resp, next))
      .catch(next)
  }

  replace = (req: any, resp: any, next: any): void => {
    const options = { runValidators: true, overwrite: true }
    this.model
      .update({ _id: req.params.id }, req.body, options)
      .exec()
      .then(result => {
        if (result.n) {
          return this.model.findById(req.params.id)
        } else {
          throw new NotFoundError('Documento não encontrado')
        }
      })
      .then(this.render(resp, next))
      .catch(next)
  }

  update = (req: any, resp: any, next: any): void => {
    const options = { runValidators: true, new: true }
    this.model
      .findByIdAndUpdate(req.params.id, req.body, options)
      .then(this.render(resp, next))
      .catch(next)
  }

  delete = (req: any, resp: any, next: any): void => {
    this.model
      .remove({ _id: req.params.id })
      .exec()
      .then((cmdResult: any) => {
        if (cmdResult.result.n) {
          resp.send(204)
        } else {
          throw new NotFoundError('Documento não encontrado')
        }
        return next()
      })
      .catch(next)
  }
}
