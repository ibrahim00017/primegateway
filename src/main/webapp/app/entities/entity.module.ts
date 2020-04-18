import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'banque',
        loadChildren: () => import('./primeservice/banque/banque.module').then(m => m.PrimeserviceBanqueModule)
      },
      {
        path: 'compte',
        loadChildren: () => import('./primeservice/compte/compte.module').then(m => m.PrimeserviceCompteModule)
      },
      {
        path: 'grade',
        loadChildren: () => import('./primeservice/grade/grade.module').then(m => m.PrimeserviceGradeModule)
      },
      {
        path: 'direction',
        loadChildren: () => import('./primeservice/direction/direction.module').then(m => m.PrimeserviceDirectionModule)
      },
      {
        path: 'corps',
        loadChildren: () => import('./primeservice/corps/corps.module').then(m => m.PrimeserviceCorpsModule)
      },
      {
        path: 'prime',
        loadChildren: () => import('./primeservice/prime/prime.module').then(m => m.PrimeservicePrimeModule)
      },
      {
        path: 'trimestre',
        loadChildren: () => import('./primeservice/trimestre/trimestre.module').then(m => m.PrimeserviceTrimestreModule)
      },
      {
        path: 'annee',
        loadChildren: () => import('./primeservice/annee/annee.module').then(m => m.PrimeserviceAnneeModule)
      },
      {
        path: 'agent',
        loadChildren: () => import('./primeservice/agent/agent.module').then(m => m.PrimeserviceAgentModule)
      },
      {
        path: 'fonction',
        loadChildren: () => import('./primeservice/fonction/fonction.module').then(m => m.PrimeserviceFonctionModule)
      },
      {
        path: 'promotion',
        loadChildren: () => import('./primeservice/promotion/promotion.module').then(m => m.PrimeservicePromotionModule)
      },
      {
        path: 'allouer',
        loadChildren: () => import('./primeservice/allouer/allouer.module').then(m => m.PrimeserviceAllouerModule)
      },
      {
        path: 'avancement',
        loadChildren: () => import('./primeservice/avancement/avancement.module').then(m => m.PrimeserviceAvancementModule)
      },
      {
        path: 'changement',
        loadChildren: () => import('./primeservice/changement/changement.module').then(m => m.PrimeserviceChangementModule)
      },
      {
        path: 'affectation',
        loadChildren: () => import('./primeservice/affectation/affectation.module').then(m => m.PrimeserviceAffectationModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class PrimegatewayEntityModule {}
