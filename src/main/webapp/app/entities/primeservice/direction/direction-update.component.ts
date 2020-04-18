import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDirection, Direction } from 'app/shared/model/primeservice/direction.model';
import { DirectionService } from './direction.service';

@Component({
  selector: 'jhi-direction-update',
  templateUrl: './direction-update.component.html'
})
export class DirectionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    sigle: [null, [Validators.required]],
    libelleDirection: [null, [Validators.required]]
  });

  constructor(protected directionService: DirectionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ direction }) => {
      this.updateForm(direction);
    });
  }

  updateForm(direction: IDirection): void {
    this.editForm.patchValue({
      id: direction.id,
      sigle: direction.sigle,
      libelleDirection: direction.libelleDirection
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const direction = this.createFromForm();
    if (direction.id !== undefined) {
      this.subscribeToSaveResponse(this.directionService.update(direction));
    } else {
      this.subscribeToSaveResponse(this.directionService.create(direction));
    }
  }

  private createFromForm(): IDirection {
    return {
      ...new Direction(),
      id: this.editForm.get(['id'])!.value,
      sigle: this.editForm.get(['sigle'])!.value,
      libelleDirection: this.editForm.get(['libelleDirection'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDirection>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
