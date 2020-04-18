import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimegatewaySharedModule } from 'app/shared/shared.module';
import { ChangementComponent } from './changement.component';
import { ChangementDetailComponent } from './changement-detail.component';
import { ChangementUpdateComponent } from './changement-update.component';
import { ChangementDeleteDialogComponent } from './changement-delete-dialog.component';
import { changementRoute } from './changement.route';

@NgModule({
  imports: [PrimegatewaySharedModule, RouterModule.forChild(changementRoute)],
  declarations: [ChangementComponent, ChangementDetailComponent, ChangementUpdateComponent, ChangementDeleteDialogComponent],
  entryComponents: [ChangementDeleteDialogComponent]
})
export class PrimeserviceChangementModule {}
