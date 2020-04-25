import { Moment } from 'moment';

export interface ISpecifique {
  id?: number;
  matricule?: number;
  nom?: string;
  prenoms?: string;
  nombreDeJours?: number;
  taux?: number;
  montant?: number;
  datePriseService?: Moment;
}

export class Specifique implements ISpecifique {
  constructor(
    public id?: number,
    public matricule?: number,
    public nom?: string,
    public prenoms?: string,
    public nombreDeJours?: number,
    public taux?: number,
    public montant?: number,
    public datePriseService?: Moment
  ) {}
}
