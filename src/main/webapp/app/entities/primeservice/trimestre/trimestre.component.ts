import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITrimestre } from 'app/shared/model/primeservice/trimestre.model';
import { TrimestreService } from './trimestre.service';
import { TrimestreDeleteDialogComponent } from './trimestre-delete-dialog.component';

@Component({
  selector: 'jhi-trimestre',
  templateUrl: './trimestre.component.html'
})
export class TrimestreComponent implements OnInit, OnDestroy {
  trimestres?: ITrimestre[];
  eventSubscriber?: Subscription;

  constructor(protected trimestreService: TrimestreService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.trimestreService.query().subscribe((res: HttpResponse<ITrimestre[]>) => (this.trimestres = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTrimestres();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITrimestre): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTrimestres(): void {
    this.eventSubscriber = this.eventManager.subscribe('trimestreListModification', () => this.loadAll());
  }

  delete(trimestre: ITrimestre): void {
    const modalRef = this.modalService.open(TrimestreDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.trimestre = trimestre;
  }
}
