import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISedentarisation } from 'app/shared/model/sedentarisation.model';

@Component({
  selector: 'jhi-sedentarisation-detail',
  templateUrl: './sedentarisation-detail.component.html'
})
export class SedentarisationDetailComponent implements OnInit {
  sedentarisation: ISedentarisation | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sedentarisation }) => (this.sedentarisation = sedentarisation));
  }

  previousState(): void {
    window.history.back();
  }
}
