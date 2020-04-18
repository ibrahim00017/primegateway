import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimegatewaySharedModule } from 'app/shared/shared.module';
import { PrimeComponent } from './prime.component';
import { PrimeDetailComponent } from './prime-detail.component';
import { PrimeUpdateComponent } from './prime-update.component';
import { PrimeDeleteDialogComponent } from './prime-delete-dialog.component';
import { primeRoute } from './prime.route';

@NgModule({
  imports: [PrimegatewaySharedModule, RouterModule.forChild(primeRoute)],
  declarations: [PrimeComponent, PrimeDetailComponent, PrimeUpdateComponent, PrimeDeleteDialogComponent],
  entryComponents: [PrimeDeleteDialogComponent]
})
export class PrimeservicePrimeModule {}
