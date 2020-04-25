import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimegatewaySharedModule } from 'app/shared/shared.module';
import { ImpulsionComponent } from './impulsion.component';
import { ImpulsionDetailComponent } from './impulsion-detail.component';
import { impulsionRoute } from './impulsion.route';

@NgModule({
  imports: [PrimegatewaySharedModule, RouterModule.forChild(impulsionRoute)],
  declarations: [ImpulsionComponent, ImpulsionDetailComponent]
})
export class PrimegatewayImpulsionModule {}
