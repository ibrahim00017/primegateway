import { Moment } from 'moment';
import { IAgent } from 'app/shared/model/primeservice/agent.model';
import { IFonction } from 'app/shared/model/primeservice/fonction.model';

export interface IPromotion {
  id?: number;
  dateDebut?: Moment;
  dateFin?: Moment;
  agent?: IAgent;
  fonction?: IFonction;
}

export class Promotion implements IPromotion {
  constructor(public id?: number, public dateDebut?: Moment, public dateFin?: Moment, public agent?: IAgent, public fonction?: IFonction) {}
}
