const users = [
  {id: '1', name:'gean', email: 'geanfeltrin72@gma' },
  {id: '2', name:'gean1', email: 'geanfeltrin732@gma'},
]


export class User{
  static findAll(): Promise<any[]> {
    return Promise.resolve(users)
  }

  static findById(id: string): Promise<any>{
    return new Promise(resolve => {
      const filtered = users.filter(user1 => user1.id === id)
      let user
      if(filtered.length > 0){
        user = filtered[0]
      }
      resolve(user)
    })
  }
}