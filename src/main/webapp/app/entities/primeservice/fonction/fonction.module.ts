import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimegatewaySharedModule } from 'app/shared/shared.module';
import { FonctionComponent } from './fonction.component';
import { FonctionDetailComponent } from './fonction-detail.component';
import { FonctionUpdateComponent } from './fonction-update.component';
import { FonctionDeleteDialogComponent } from './fonction-delete-dialog.component';
import { fonctionRoute } from './fonction.route';

@NgModule({
  imports: [PrimegatewaySharedModule, RouterModule.forChild(fonctionRoute)],
  declarations: [FonctionComponent, FonctionDetailComponent, FonctionUpdateComponent, FonctionDeleteDialogComponent],
  entryComponents: [FonctionDeleteDialogComponent]
})
export class PrimeserviceFonctionModule {}
