import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IChangement } from 'app/shared/model/primeservice/changement.model';
import { ChangementService } from './changement.service';

@Component({
  templateUrl: './changement-delete-dialog.component.html'
})
export class ChangementDeleteDialogComponent {
  changement?: IChangement;

  constructor(
    protected changementService: ChangementService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.changementService.delete(id).subscribe(() => {
      this.eventManager.broadcast('changementListModification');
      this.activeModal.close();
    });
  }
}
