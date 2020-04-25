import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISedentarisation, Sedentarisation } from 'app/shared/model/sedentarisation.model';
import { SedentarisationService } from './sedentarisation.service';
import { SedentarisationComponent } from './sedentarisation.component';
import { SedentarisationDetailComponent } from './sedentarisation-detail.component';

@Injectable({ providedIn: 'root' })
export class SedentarisationResolve implements Resolve<ISedentarisation> {
  constructor(private service: SedentarisationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISedentarisation> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((sedentarisation: HttpResponse<Sedentarisation>) => {
          if (sedentarisation.body) {
            return of(sedentarisation.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Sedentarisation());
  }
}

export const sedentarisationRoute: Routes = [
  {
    path: '',
    component: SedentarisationComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'primegatewayApp.sedentarisation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SedentarisationDetailComponent,
    resolve: {
      sedentarisation: SedentarisationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'primegatewayApp.sedentarisation.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
