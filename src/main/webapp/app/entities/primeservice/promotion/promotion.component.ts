import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPromotion } from 'app/shared/model/primeservice/promotion.model';
import { PromotionService } from './promotion.service';
import { PromotionDeleteDialogComponent } from './promotion-delete-dialog.component';

@Component({
  selector: 'jhi-promotion',
  templateUrl: './promotion.component.html'
})
export class PromotionComponent implements OnInit, OnDestroy {
  promotions?: IPromotion[];
  eventSubscriber?: Subscription;

  constructor(protected promotionService: PromotionService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.promotionService.query().subscribe((res: HttpResponse<IPromotion[]>) => (this.promotions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPromotions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPromotion): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPromotions(): void {
    this.eventSubscriber = this.eventManager.subscribe('promotionListModification', () => this.loadAll());
  }

  delete(promotion: IPromotion): void {
    const modalRef = this.modalService.open(PromotionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.promotion = promotion;
  }
}
