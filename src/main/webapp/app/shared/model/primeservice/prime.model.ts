import { Typeprime } from 'app/shared/model/enumerations/typeprime.model';

export interface IPrime {
  id?: number;
  prime?: string;
  tauxMensuel?: number;
  typePrime?: Typeprime;
}

export class Prime implements IPrime {
  constructor(public id?: number, public prime?: string, public tauxMensuel?: number, public typePrime?: Typeprime) {}
}
