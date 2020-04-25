import { Moment } from 'moment';

export interface ISedentarisation {
  id?: number;
  matricule?: number;
  nom?: string;
  prenoms?: string;
  nombreDeJours?: number;
  montant?: number;
  priseService?: Moment;
}

export class Sedentarisation implements ISedentarisation {
  constructor(
    public id?: number,
    public matricule?: number,
    public nom?: string,
    public prenoms?: string,
    public nombreDeJours?: number,
    public montant?: number,
    public priseService?: Moment
  ) {}
}
