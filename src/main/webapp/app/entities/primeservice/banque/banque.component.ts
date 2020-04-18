import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBanque } from 'app/shared/model/primeservice/banque.model';
import { BanqueService } from './banque.service';
import { BanqueDeleteDialogComponent } from './banque-delete-dialog.component';

@Component({
  selector: 'jhi-banque',
  templateUrl: './banque.component.html'
})
export class BanqueComponent implements OnInit, OnDestroy {
  banques?: IBanque[];
  eventSubscriber?: Subscription;

  constructor(protected banqueService: BanqueService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.banqueService.query().subscribe((res: HttpResponse<IBanque[]>) => (this.banques = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInBanques();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBanque): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBanques(): void {
    this.eventSubscriber = this.eventManager.subscribe('banqueListModification', () => this.loadAll());
  }

  delete(banque: IBanque): void {
    const modalRef = this.modalService.open(BanqueDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.banque = banque;
  }
}
