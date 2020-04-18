import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAvancement } from 'app/shared/model/primeservice/avancement.model';
import { AvancementService } from './avancement.service';
import { AvancementDeleteDialogComponent } from './avancement-delete-dialog.component';

@Component({
  selector: 'jhi-avancement',
  templateUrl: './avancement.component.html'
})
export class AvancementComponent implements OnInit, OnDestroy {
  avancements?: IAvancement[];
  eventSubscriber?: Subscription;

  constructor(protected avancementService: AvancementService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.avancementService.query().subscribe((res: HttpResponse<IAvancement[]>) => (this.avancements = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAvancements();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAvancement): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAvancements(): void {
    this.eventSubscriber = this.eventManager.subscribe('avancementListModification', () => this.loadAll());
  }

  delete(avancement: IAvancement): void {
    const modalRef = this.modalService.open(AvancementDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.avancement = avancement;
  }
}
