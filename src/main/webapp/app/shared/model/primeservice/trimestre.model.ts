export interface ITrimestre {
  id?: number;
  codeTrimestre?: number;
}

export class Trimestre implements ITrimestre {
  constructor(public id?: number, public codeTrimestre?: number) {}
}
