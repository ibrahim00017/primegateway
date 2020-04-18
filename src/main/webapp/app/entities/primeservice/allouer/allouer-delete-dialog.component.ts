import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAllouer } from 'app/shared/model/primeservice/allouer.model';
import { AllouerService } from './allouer.service';

@Component({
  templateUrl: './allouer-delete-dialog.component.html'
})
export class AllouerDeleteDialogComponent {
  allouer?: IAllouer;

  constructor(protected allouerService: AllouerService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.allouerService.delete(id).subscribe(() => {
      this.eventManager.broadcast('allouerListModification');
      this.activeModal.close();
    });
  }
}
