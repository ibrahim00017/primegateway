import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICorps } from 'app/shared/model/primeservice/corps.model';
import { CorpsService } from './corps.service';

@Component({
  templateUrl: './corps-delete-dialog.component.html'
})
export class CorpsDeleteDialogComponent {
  corps?: ICorps;

  constructor(protected corpsService: CorpsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.corpsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('corpsListModification');
      this.activeModal.close();
    });
  }
}
