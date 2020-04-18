import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimegatewaySharedModule } from 'app/shared/shared.module';
import { CorpsComponent } from './corps.component';
import { CorpsDetailComponent } from './corps-detail.component';
import { CorpsUpdateComponent } from './corps-update.component';
import { CorpsDeleteDialogComponent } from './corps-delete-dialog.component';
import { corpsRoute } from './corps.route';

@NgModule({
  imports: [PrimegatewaySharedModule, RouterModule.forChild(corpsRoute)],
  declarations: [CorpsComponent, CorpsDetailComponent, CorpsUpdateComponent, CorpsDeleteDialogComponent],
  entryComponents: [CorpsDeleteDialogComponent]
})
export class PrimeserviceCorpsModule {}
