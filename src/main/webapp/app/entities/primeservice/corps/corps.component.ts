import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICorps } from 'app/shared/model/primeservice/corps.model';
import { CorpsService } from './corps.service';
import { CorpsDeleteDialogComponent } from './corps-delete-dialog.component';

@Component({
  selector: 'jhi-corps',
  templateUrl: './corps.component.html'
})
export class CorpsComponent implements OnInit, OnDestroy {
  corps?: ICorps[];
  eventSubscriber?: Subscription;

  constructor(protected corpsService: CorpsService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.corpsService.query().subscribe((res: HttpResponse<ICorps[]>) => (this.corps = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCorps();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICorps): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCorps(): void {
    this.eventSubscriber = this.eventManager.subscribe('corpsListModification', () => this.loadAll());
  }

  delete(corps: ICorps): void {
    const modalRef = this.modalService.open(CorpsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.corps = corps;
  }
}
