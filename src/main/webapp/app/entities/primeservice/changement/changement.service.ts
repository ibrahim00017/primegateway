import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IChangement } from 'app/shared/model/primeservice/changement.model';

type EntityResponseType = HttpResponse<IChangement>;
type EntityArrayResponseType = HttpResponse<IChangement[]>;

@Injectable({ providedIn: 'root' })
export class ChangementService {
  public resourceUrl = SERVER_API_URL + 'services/primeservice/api/changements';

  constructor(protected http: HttpClient) {}

  create(changement: IChangement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(changement);
    return this.http
      .post<IChangement>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(changement: IChangement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(changement);
    return this.http
      .put<IChangement>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IChangement>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IChangement[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(changement: IChangement): IChangement {
    const copy: IChangement = Object.assign({}, changement, {
      dateDebut: changement.dateDebut && changement.dateDebut.isValid() ? changement.dateDebut.toJSON() : undefined,
      datefin: changement.datefin && changement.datefin.isValid() ? changement.datefin.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateDebut = res.body.dateDebut ? moment(res.body.dateDebut) : undefined;
      res.body.datefin = res.body.datefin ? moment(res.body.datefin) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((changement: IChangement) => {
        changement.dateDebut = changement.dateDebut ? moment(changement.dateDebut) : undefined;
        changement.datefin = changement.datefin ? moment(changement.datefin) : undefined;
      });
    }
    return res;
  }
}
