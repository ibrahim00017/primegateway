import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAllouer } from 'app/shared/model/primeservice/allouer.model';
import { AllouerService } from './allouer.service';
import { AllouerDeleteDialogComponent } from './allouer-delete-dialog.component';

@Component({
  selector: 'jhi-allouer',
  templateUrl: './allouer.component.html'
})
export class AllouerComponent implements OnInit, OnDestroy {
  allouers?: IAllouer[];
  eventSubscriber?: Subscription;

  constructor(protected allouerService: AllouerService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.allouerService.query().subscribe((res: HttpResponse<IAllouer[]>) => (this.allouers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAllouers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAllouer): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAllouers(): void {
    this.eventSubscriber = this.eventManager.subscribe('allouerListModification', () => this.loadAll());
  }

  delete(allouer: IAllouer): void {
    const modalRef = this.modalService.open(AllouerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.allouer = allouer;
  }
}
