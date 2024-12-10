export class UserDomain {
  name: string;
  email: string;
  password?: string;
  userId?: string;
  pokemon?: Array<any>;
  _id?: any;
  constructor(data: {
    _id?: any;
    name: string;
    email: string;
    password: string;
    userId: string;
    pokemon: Array<any>;
  }) {
    this._id = data?._id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.userId = data.userId;
    this.pokemon = data.pokemon;
  }
}
