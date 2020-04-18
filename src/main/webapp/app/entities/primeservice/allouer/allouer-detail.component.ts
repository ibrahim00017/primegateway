import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAllouer } from 'app/shared/model/primeservice/allouer.model';

@Component({
  selector: 'jhi-allouer-detail',
  templateUrl: './allouer-detail.component.html'
})
export class AllouerDetailComponent implements OnInit {
  allouer: IAllouer | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ allouer }) => (this.allouer = allouer));
  }

  previousState(): void {
    window.history.back();
  }
}
