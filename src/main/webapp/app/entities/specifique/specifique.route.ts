import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISpecifique, Specifique } from 'app/shared/model/specifique.model';
import { SpecifiqueService } from './specifique.service';
import { SpecifiqueComponent } from './specifique.component';
import { SpecifiqueDetailComponent } from './specifique-detail.component';

@Injectable({ providedIn: 'root' })
export class SpecifiqueResolve implements Resolve<ISpecifique> {
  constructor(private service: SpecifiqueService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISpecifique> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((specifique: HttpResponse<Specifique>) => {
          if (specifique.body) {
            return of(specifique.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Specifique());
  }
}

export const specifiqueRoute: Routes = [
  {
    path: '',
    component: SpecifiqueComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'primegatewayApp.specifique.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SpecifiqueDetailComponent,
    resolve: {
      specifique: SpecifiqueResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'primegatewayApp.specifique.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
