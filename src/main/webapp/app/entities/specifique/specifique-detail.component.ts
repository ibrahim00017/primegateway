import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISpecifique } from 'app/shared/model/specifique.model';

@Component({
  selector: 'jhi-specifique-detail',
  templateUrl: './specifique-detail.component.html'
})
export class SpecifiqueDetailComponent implements OnInit {
  specifique: ISpecifique | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ specifique }) => (this.specifique = specifique));
  }

  previousState(): void {
    window.history.back();
  }
}
