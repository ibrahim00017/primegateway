import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISpecifique } from 'app/shared/model/specifique.model';

type EntityResponseType = HttpResponse<ISpecifique>;
type EntityArrayResponseType = HttpResponse<ISpecifique[]>;

@Injectable({ providedIn: 'root' })
export class SpecifiqueService {
  public resourceUrl = SERVER_API_URL + 'api/specifiques';

  constructor(protected http: HttpClient) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISpecifique>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISpecifique[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(specifique: ISpecifique): ISpecifique {
    const copy: ISpecifique = Object.assign({}, specifique, {
      datePriseService:
        specifique.datePriseService && specifique.datePriseService.isValid() ? specifique.datePriseService.format(DATE_FORMAT) : undefined
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
      res.body.forEach((specifique: ISpecifique) => {
        specifique.datePriseService = specifique.datePriseService ? moment(specifique.datePriseService) : undefined;
      });
    }
    return res;
  }
}
