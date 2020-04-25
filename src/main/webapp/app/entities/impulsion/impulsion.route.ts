import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IImpulsion, Impulsion } from 'app/shared/model/impulsion.model';
import { ImpulsionService } from './impulsion.service';
import { ImpulsionComponent } from './impulsion.component';
import { ImpulsionDetailComponent } from './impulsion-detail.component';

@Injectable({ providedIn: 'root' })
export class ImpulsionResolve implements Resolve<IImpulsion> {
  constructor(private service: ImpulsionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IImpulsion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((impulsion: HttpResponse<Impulsion>) => {
          if (impulsion.body) {
            return of(impulsion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Impulsion());
  }
}

export const impulsionRoute: Routes = [
  {
    path: '',
    component: ImpulsionComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'primegatewayApp.impulsion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ImpulsionDetailComponent,
    resolve: {
      impulsion: ImpulsionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'primegatewayApp.impulsion.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
