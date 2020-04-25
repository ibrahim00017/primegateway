import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimegatewaySharedModule } from 'app/shared/shared.module';
import { SpecifiqueComponent } from './specifique.component';
import { SpecifiqueDetailComponent } from './specifique-detail.component';
import { specifiqueRoute } from './specifique.route';

@NgModule({
  imports: [PrimegatewaySharedModule, RouterModule.forChild(specifiqueRoute)],
  declarations: [SpecifiqueComponent, SpecifiqueDetailComponent]
})
export class PrimegatewaySpecifiqueModule {}
