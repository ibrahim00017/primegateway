import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPrime } from 'app/shared/model/primeservice/prime.model';
import { PrimeService } from './prime.service';
import { PrimeDeleteDialogComponent } from './prime-delete-dialog.component';

@Component({
  selector: 'jhi-prime',
  templateUrl: './prime.component.html'
})
export class PrimeComponent implements OnInit, OnDestroy {
  primes?: IPrime[];
  eventSubscriber?: Subscription;

  constructor(protected primeService: PrimeService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.primeService.query().subscribe((res: HttpResponse<IPrime[]>) => (this.primes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPrimes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPrime): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPrimes(): void {
    this.eventSubscriber = this.eventManager.subscribe('primeListModification', () => this.loadAll());
  }

  delete(prime: IPrime): void {
    const modalRef = this.modalService.open(PrimeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.prime = prime;
  }
}
