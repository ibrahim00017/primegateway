import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimegatewaySharedModule } from 'app/shared/shared.module';
import { AffectationComponent } from './affectation.component';
import { AffectationDetailComponent } from './affectation-detail.component';
import { AffectationUpdateComponent } from './affectation-update.component';
import { AffectationDeleteDialogComponent } from './affectation-delete-dialog.component';
import { affectationRoute } from './affectation.route';

@NgModule({
  imports: [PrimegatewaySharedModule, RouterModule.forChild(affectationRoute)],
  declarations: [AffectationComponent, AffectationDetailComponent, AffectationUpdateComponent, AffectationDeleteDialogComponent],
  entryComponents: [AffectationDeleteDialogComponent]
})
export class PrimeserviceAffectationModule {}
