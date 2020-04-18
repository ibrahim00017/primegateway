import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimegatewaySharedModule } from 'app/shared/shared.module';
import { AllouerComponent } from './allouer.component';
import { AllouerDetailComponent } from './allouer-detail.component';
import { AllouerUpdateComponent } from './allouer-update.component';
import { AllouerDeleteDialogComponent } from './allouer-delete-dialog.component';
import { allouerRoute } from './allouer.route';

@NgModule({
  imports: [PrimegatewaySharedModule, RouterModule.forChild(allouerRoute)],
  declarations: [AllouerComponent, AllouerDetailComponent, AllouerUpdateComponent, AllouerDeleteDialogComponent],
  entryComponents: [AllouerDeleteDialogComponent]
})
export class PrimeserviceAllouerModule {}
