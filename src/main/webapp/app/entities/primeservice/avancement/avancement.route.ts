import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAvancement, Avancement } from 'app/shared/model/primeservice/avancement.model';
import { AvancementService } from './avancement.service';
import { AvancementComponent } from './avancement.component';
import { AvancementDetailComponent } from './avancement-detail.component';
import { AvancementUpdateComponent } from './avancement-update.component';

@Injectable({ providedIn: 'root' })
export class AvancementResolve implements Resolve<IAvancement> {
  constructor(private service: AvancementService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAvancement> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((avancement: HttpResponse<Avancement>) => {
          if (avancement.body) {
            return of(avancement.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Avancement());
  }
}

export const avancementRoute: Routes = [
  {
    path: '',
    component: AvancementComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'primegatewayApp.primeserviceAvancement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AvancementDetailComponent,
    resolve: {
      avancement: AvancementResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'primegatewayApp.primeserviceAvancement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AvancementUpdateComponent,
    resolve: {
      avancement: AvancementResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'primegatewayApp.primeserviceAvancement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AvancementUpdateComponent,
    resolve: {
      avancement: AvancementResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'primegatewayApp.primeserviceAvancement.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
