import { Moment } from 'moment';

export interface IImpulsion {
  id?: number;
  matricule?: number;
  nom?: string;
  prenoms?: string;
  nombreDeJour?: number;
  montant?: number;
  datePriseService?: Moment;
}

export class Impulsion implements IImpulsion {
  constructor(
    public id?: number,
    public matricule?: number,
    public nom?: string,
    public prenoms?: string,
    public nombreDeJour?: number,
    public montant?: number,
    public datePriseService?: Moment
  ) {}
}
