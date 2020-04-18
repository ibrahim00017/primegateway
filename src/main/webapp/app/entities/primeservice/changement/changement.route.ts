import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IChangement, Changement } from 'app/shared/model/primeservice/changement.model';
import { ChangementService } from './changement.service';
import { ChangementComponent } from './changement.component';
import { ChangementDetailComponent } from './changement-detail.component';
import { ChangementUpdateComponent } from './changement-update.component';

@Injectable({ providedIn: 'root' })
export class ChangementResolve implements Resolve<IChangement> {
  constructor(private service: ChangementService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChangement> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((changement: HttpResponse<Changement>) => {
          if (changement.body) {
            return of(changement.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Changement());
  }
}

export const changementRoute: Routes = [
  {
    path: '',
    component: ChangementComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'primegatewayApp.primeserviceChangement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ChangementDetailComponent,
    resolve: {
      changement: ChangementResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'primegatewayApp.primeserviceChangement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ChangementUpdateComponent,
    resolve: {
      changement: ChangementResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'primegatewayApp.primeserviceChangement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ChangementUpdateComponent,
    resolve: {
      changement: ChangementResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'primegatewayApp.primeserviceChangement.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
