import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IImpulsion } from 'app/shared/model/impulsion.model';

type EntityResponseType = HttpResponse<IImpulsion>;
type EntityArrayResponseType = HttpResponse<IImpulsion[]>;

@Injectable({ providedIn: 'root' })
export class ImpulsionService {
  public resourceUrl = SERVER_API_URL + 'api/impulsions';

  constructor(protected http: HttpClient) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IImpulsion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IImpulsion[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(impulsion: IImpulsion): IImpulsion {
    const copy: IImpulsion = Object.assign({}, impulsion, {
      datePriseService:
        impulsion.datePriseService && impulsion.datePriseService.isValid() ? impulsion.datePriseService.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.datePriseService = res.body.datePriseService ? moment(res.body.datePriseService) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((impulsion: IImpulsion) => {
        impulsion.datePriseService = impulsion.datePriseService ? moment(impulsion.datePriseService) : undefined;
      });
    }
    return res;
  }
}
