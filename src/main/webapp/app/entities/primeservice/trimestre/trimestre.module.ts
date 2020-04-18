import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimegatewaySharedModule } from 'app/shared/shared.module';
import { TrimestreComponent } from './trimestre.component';
import { TrimestreDetailComponent } from './trimestre-detail.component';
import { TrimestreUpdateComponent } from './trimestre-update.component';
import { TrimestreDeleteDialogComponent } from './trimestre-delete-dialog.component';
import { trimestreRoute } from './trimestre.route';

@NgModule({
  imports: [PrimegatewaySharedModule, RouterModule.forChild(trimestreRoute)],
  declarations: [TrimestreComponent, TrimestreDetailComponent, TrimestreUpdateComponent, TrimestreDeleteDialogComponent],
  entryComponents: [TrimestreDeleteDialogComponent]
})
export class PrimeserviceTrimestreModule {}
