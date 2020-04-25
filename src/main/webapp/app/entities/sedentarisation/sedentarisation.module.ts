import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimegatewaySharedModule } from 'app/shared/shared.module';
import { SedentarisationComponent } from './sedentarisation.component';
import { SedentarisationDetailComponent } from './sedentarisation-detail.component';
import { sedentarisationRoute } from './sedentarisation.route';

@NgModule({
  imports: [PrimegatewaySharedModule, RouterModule.forChild(sedentarisationRoute)],
  declarations: [SedentarisationComponent, SedentarisationDetailComponent]
})
export class PrimegatewaySedentarisationModule {}
