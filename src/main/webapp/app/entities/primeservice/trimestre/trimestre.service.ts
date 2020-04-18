import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITrimestre } from 'app/shared/model/primeservice/trimestre.model';

type EntityResponseType = HttpResponse<ITrimestre>;
type EntityArrayResponseType = HttpResponse<ITrimestre[]>;

@Injectable({ providedIn: 'root' })
export class TrimestreService {
  public resourceUrl = SERVER_API_URL + 'services/primeservice/api/trimestres';

  constructor(protected http: HttpClient) {}

  create(trimestre: ITrimestre): Observable<EntityResponseType> {
    return this.http.post<ITrimestre>(this.resourceUrl, trimestre, { observe: 'response' });
  }

  update(trimestre: ITrimestre): Observable<EntityResponseType> {
    return this.http.put<ITrimestre>(this.resourceUrl, trimestre, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITrimestre>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITrimestre[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
