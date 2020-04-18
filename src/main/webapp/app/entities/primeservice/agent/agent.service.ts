import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAgent } from 'app/shared/model/primeservice/agent.model';

type EntityResponseType = HttpResponse<IAgent>;
type EntityArrayResponseType = HttpResponse<IAgent[]>;

@Injectable({ providedIn: 'root' })
export class AgentService {
  public resourceUrl = SERVER_API_URL + 'services/primeservice/api/agents';

  constructor(protected http: HttpClient) {}

  create(agent: IAgent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(agent);
    return this.http
      .post<IAgent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(agent: IAgent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(agent);
    return this.http
      .put<IAgent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAgent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAgent[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(agent: IAgent): IAgent {
    const copy: IAgent = Object.assign({}, agent, {
      dateNaiss: agent.dateNaiss && agent.dateNaiss.isValid() ? agent.dateNaiss.toJSON() : undefined,
      datePriseServ: agent.datePriseServ && agent.datePriseServ.isValid() ? agent.datePriseServ.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateNaiss = res.body.dateNaiss ? moment(res.body.dateNaiss) : undefined;
      res.body.datePriseServ = res.body.datePriseServ ? moment(res.body.datePriseServ) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((agent: IAgent) => {
        agent.dateNaiss = agent.dateNaiss ? moment(agent.dateNaiss) : undefined;
        agent.datePriseServ = agent.datePriseServ ? moment(agent.datePriseServ) : undefined;
      });
    }
    return res;
  }
}
