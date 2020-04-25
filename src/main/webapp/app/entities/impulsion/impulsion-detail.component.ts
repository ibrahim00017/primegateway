import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IImpulsion } from 'app/shared/model/impulsion.model';

@Component({
  selector: 'jhi-impulsion-detail',
  templateUrl: './impulsion-detail.component.html'
})
export class ImpulsionDetailComponent implements OnInit {
  impulsion: IImpulsion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ impulsion }) => (this.impulsion = impulsion));
  }

  previousState(): void {
    window.history.back();
  }
}
