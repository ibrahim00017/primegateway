import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAvancement } from 'app/shared/model/primeservice/avancement.model';

type EntityResponseType = HttpResponse<IAvancement>;
type EntityArrayResponseType = HttpResponse<IAvancement[]>;

@Injectable({ providedIn: 'root' })
export class AvancementService {
  public resourceUrl = SERVER_API_URL + 'services/primeservice/api/avancements';

  constructor(protected http: HttpClient) {}

  create(avancement: IAvancement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(avancement);
    return this.http
      .post<IAvancement>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(avancement: IAvancement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(avancement);
    return this.http
      .put<IAvancement>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAvancement>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAvancement[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(avancement: IAvancement): IAvancement {
    const copy: IAvancement = Object.assign({}, avancement, {
      dateDebut: avancement.dateDebut && avancement.dateDebut.isValid() ? avancement.dateDebut.toJSON() : undefined,
      dateFin: avancement.dateFin && avancement.dateFin.isValid() ? avancement.dateFin.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateDebut = res.body.dateDebut ? moment(res.body.dateDebut) : undefined;
      res.body.dateFin = res.body.dateFin ? moment(res.body.dateFin) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((avancement: IAvancement) => {
        avancement.dateDebut = avancement.dateDebut ? moment(avancement.dateDebut) : undefined;
        avancement.dateFin = avancement.dateFin ? moment(avancement.dateFin) : undefined;
      });
    }
    return res;
  }
}
