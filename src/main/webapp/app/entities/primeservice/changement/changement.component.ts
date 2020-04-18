import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IChangement } from 'app/shared/model/primeservice/changement.model';
import { ChangementService } from './changement.service';
import { ChangementDeleteDialogComponent } from './changement-delete-dialog.component';

@Component({
  selector: 'jhi-changement',
  templateUrl: './changement.component.html'
})
export class ChangementComponent implements OnInit, OnDestroy {
  changements?: IChangement[];
  eventSubscriber?: Subscription;

  constructor(protected changementService: ChangementService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.changementService.query().subscribe((res: HttpResponse<IChangement[]>) => (this.changements = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInChangements();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IChangement): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInChangements(): void {
    this.eventSubscriber = this.eventManager.subscribe('changementListModification', () => this.loadAll());
  }

  delete(changement: IChangement): void {
    const modalRef = this.modalService.open(ChangementDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.changement = changement;
  }
}
