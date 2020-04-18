import { IAgent } from 'app/shared/model/primeservice/agent.model';
import { IBanque } from 'app/shared/model/primeservice/banque.model';

export interface ICompte {
  id?: number;
  numeroCompte?: string;
  statut?: boolean;
  agent?: IAgent;
  banque?: IBanque;
}

export class Compte implements ICompte {
  constructor(public id?: number, public numeroCompte?: string, public statut?: boolean, public agent?: IAgent, public banque?: IBanque) {
    this.statut = this.statut || false;
  }
}
