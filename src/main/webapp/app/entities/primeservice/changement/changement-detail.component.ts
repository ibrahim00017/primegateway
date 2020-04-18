import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChangement } from 'app/shared/model/primeservice/changement.model';

@Component({
  selector: 'jhi-changement-detail',
  templateUrl: './changement-detail.component.html'
})
export class ChangementDetailComponent implements OnInit {
  changement: IChangement | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ changement }) => (this.changement = changement));
  }

  previousState(): void {
    window.history.back();
  }
}
