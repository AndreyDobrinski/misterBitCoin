// export class User {
//     constructor(public name: string,
//     public coins: number,
//     public moves: any){}
// }

export class User {
    constructor(public name: string='',
    public _id?:string,    
    public coins: number = 100,
    public moves:Array <any>=[]){}

    setId?() {
        this._id = (Math.random() / Math.random()).toString()
      }
}
