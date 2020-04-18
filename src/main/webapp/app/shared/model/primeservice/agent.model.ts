import { Moment } from 'moment';
import { IFonction } from 'app/shared/model/primeservice/fonction.model';
import { IDirection } from 'app/shared/model/primeservice/direction.model';
import { IGrade } from 'app/shared/model/primeservice/grade.model';
import { ICorps } from 'app/shared/model/primeservice/corps.model';
import { ICompte } from 'app/shared/model/primeservice/compte.model';
import { SituationMatrimoniale } from 'app/shared/model/enumerations/situation-matrimoniale.model';
import { Statut } from 'app/shared/model/enumerations/statut.model';

export interface IAgent {
  id?: number;
  matricule?: number;
  nom?: string;
  prenoms?: string;
  dateNaiss?: Moment;
  lieuNaiss?: string;
  contact?: string;
  email?: string;
  adresse?: string;
  datePriseServ?: Moment;
  situationMatrim?: SituationMatrimoniale;
  nombreEnfts?: number;
  statut?: Statut;
  fonction?: IFonction;
  direction?: IDirection;
  grade?: IGrade;
  corps?: ICorps;
  comptes?: ICompte[];
}

export class Agent implements IAgent {
  constructor(
    public id?: number,
    public matricule?: number,
    public nom?: string,
    public prenoms?: string,
    public dateNaiss?: Moment,
    public lieuNaiss?: string,
    public contact?: string,
    public email?: string,
    public adresse?: string,
    public datePriseServ?: Moment,
    public situationMatrim?: SituationMatrimoniale,
    public nombreEnfts?: number,
    public statut?: Statut,
    public fonction?: IFonction,
    public direction?: IDirection,
    public grade?: IGrade,
    public corps?: ICorps,
    public comptes?: ICompte[]
  ) {}
}
