import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAvancement } from 'app/shared/model/primeservice/avancement.model';
import { AvancementService } from './avancement.service';

@Component({
  templateUrl: './avancement-delete-dialog.component.html'
})
export class AvancementDeleteDialogComponent {
  avancement?: IAvancement;

  constructor(
    protected avancementService: AvancementService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.avancementService.delete(id).subscribe(() => {
      this.eventManager.broadcast('avancementListModification');
      this.activeModal.close();
    });
  }
}
