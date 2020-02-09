const users = [
  {name:'gean', email: 'geanfeltrin72@gma' },
  {name:'gean1', email: 'geanfeltrin732@gma' },
]


export class User{
  static findAll(): Promise<any[]> {
    return Promise.resolve(users)
  }
}