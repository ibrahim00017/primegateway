import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAllouer, Allouer } from 'app/shared/model/primeservice/allouer.model';
import { AllouerService } from './allouer.service';
import { AllouerComponent } from './allouer.component';
import { AllouerDetailComponent } from './allouer-detail.component';
import { AllouerUpdateComponent } from './allouer-update.component';

@Injectable({ providedIn: 'root' })
export class AllouerResolve implements Resolve<IAllouer> {
  constructor(private service: AllouerService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAllouer> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((allouer: HttpResponse<Allouer>) => {
          if (allouer.body) {
            return of(allouer.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Allouer());
  }
}

export const allouerRoute: Routes = [
  {
    path: '',
    component: AllouerComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'primegatewayApp.primeserviceAllouer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AllouerDetailComponent,
    resolve: {
      allouer: AllouerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'primegatewayApp.primeserviceAllouer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AllouerUpdateComponent,
    resolve: {
      allouer: AllouerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'primegatewayApp.primeserviceAllouer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AllouerUpdateComponent,
    resolve: {
      allouer: AllouerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'primegatewayApp.primeserviceAllouer.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
