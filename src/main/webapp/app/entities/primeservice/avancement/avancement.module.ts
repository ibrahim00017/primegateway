import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimegatewaySharedModule } from 'app/shared/shared.module';
import { AvancementComponent } from './avancement.component';
import { AvancementDetailComponent } from './avancement-detail.component';
import { AvancementUpdateComponent } from './avancement-update.component';
import { AvancementDeleteDialogComponent } from './avancement-delete-dialog.component';
import { avancementRoute } from './avancement.route';

@NgModule({
  imports: [PrimegatewaySharedModule, RouterModule.forChild(avancementRoute)],
  declarations: [AvancementComponent, AvancementDetailComponent, AvancementUpdateComponent, AvancementDeleteDialogComponent],
  entryComponents: [AvancementDeleteDialogComponent]
})
export class PrimeserviceAvancementModule {}
