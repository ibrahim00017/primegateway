import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAnnee } from 'app/shared/model/primeservice/annee.model';
import { AnneeService } from './annee.service';
import { AnneeDeleteDialogComponent } from './annee-delete-dialog.component';

@Component({
  selector: 'jhi-annee',
  templateUrl: './annee.component.html'
})
export class AnneeComponent implements OnInit, OnDestroy {
  annees?: IAnnee[];
  eventSubscriber?: Subscription;

  constructor(protected anneeService: AnneeService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.anneeService.query().subscribe((res: HttpResponse<IAnnee[]>) => (this.annees = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAnnees();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAnnee): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAnnees(): void {
    this.eventSubscriber = this.eventManager.subscribe('anneeListModification', () => this.loadAll());
  }

  delete(annee: IAnnee): void {
    const modalRef = this.modalService.open(AnneeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.annee = annee;
  }
}
