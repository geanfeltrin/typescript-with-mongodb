/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable no-useless-escape */
/* eslint-disable prettier/prettier */
import mongoose, { Document } from 'mongoose'
import { validateCPF } from '../common/validators'
import bcrypt from 'bcrypt'
import { environment } from '../common/environment'

const Schema = mongoose.Schema

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 80,
    minlength: 3,
  },
  email: {
    type: String,
    unique: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  gender: {
    type: String,
    required: false,
    enum: ['Male', 'Female'],
  },
  cpf: {
    type: String,
    required: false,
    validate: {
      validator: validateCPF,
      message: '{PATH}: Invalid CPF ({VALUE})',
    },
  },
})

const hashPassword = (obj: any, next: any) => {
  bcrypt
    .hash(obj.password, environment.security.saltRounds)
    .then(hash => {
      obj.password = hash
      next()
    }).catch(next)
}

const updateMiddleware = 


userSchema.pre<User>('save', function(next) {
  if (!this.isModified('password')) {
    next()
  } else {
    hashPassword(this,next)
  }
})


userSchema.pre('findOneAndUpdate', function(next) {
  if (!this.getUpdate().password) {
    next()
  } else {
    hashPassword(this.getUpdate(),next)   
  }
})

userSchema.pre('update', function(next) {
  if (!this.getUpdate().password) {
    next()
  } else {
    hashPassword(this.getUpdate(),next)   
  }
})

export const User = mongoose.model<User>('User', userSchema)
