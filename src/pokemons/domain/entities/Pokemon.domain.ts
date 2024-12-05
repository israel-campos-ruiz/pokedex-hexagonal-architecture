export class PokemonDomain {
  name: string;
  no: number;
  _id?: any;
  constructor(data: { _id?: any; name: string; no: number }) {
    this._id = data._id;
    this.name = data.name;
    this.no = data.no;
  }
}
