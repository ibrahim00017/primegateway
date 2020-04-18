import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAffectation, Affectation } from 'app/shared/model/primeservice/affectation.model';
import { AffectationService } from './affectation.service';
import { AffectationComponent } from './affectation.component';
import { AffectationDetailComponent } from './affectation-detail.component';
import { AffectationUpdateComponent } from './affectation-update.component';

@Injectable({ providedIn: 'root' })
export class AffectationResolve implements Resolve<IAffectation> {
  constructor(private service: AffectationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAffectation> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((affectation: HttpResponse<Affectation>) => {
          if (affectation.body) {
            return of(affectation.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Affectation());
  }
}

export const affectationRoute: Routes = [
  {
    path: '',
    component: AffectationComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'primegatewayApp.primeserviceAffectation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AffectationDetailComponent,
    resolve: {
      affectation: AffectationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'primegatewayApp.primeserviceAffectation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AffectationUpdateComponent,
    resolve: {
      affectation: AffectationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'primegatewayApp.primeserviceAffectation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AffectationUpdateComponent,
    resolve: {
      affectation: AffectationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'primegatewayApp.primeserviceAffectation.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
