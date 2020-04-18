import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICorps, Corps } from 'app/shared/model/primeservice/corps.model';
import { CorpsService } from './corps.service';
import { CorpsComponent } from './corps.component';
import { CorpsDetailComponent } from './corps-detail.component';
import { CorpsUpdateComponent } from './corps-update.component';

@Injectable({ providedIn: 'root' })
export class CorpsResolve implements Resolve<ICorps> {
  constructor(private service: CorpsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICorps> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((corps: HttpResponse<Corps>) => {
          if (corps.body) {
            return of(corps.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Corps());
  }
}

export const corpsRoute: Routes = [
  {
    path: '',
    component: CorpsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'primegatewayApp.primeserviceCorps.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CorpsDetailComponent,
    resolve: {
      corps: CorpsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'primegatewayApp.primeserviceCorps.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CorpsUpdateComponent,
    resolve: {
      corps: CorpsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'primegatewayApp.primeserviceCorps.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CorpsUpdateComponent,
    resolve: {
      corps: CorpsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'primegatewayApp.primeserviceCorps.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
