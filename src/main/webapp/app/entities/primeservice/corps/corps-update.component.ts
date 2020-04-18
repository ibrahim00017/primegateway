import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICorps, Corps } from 'app/shared/model/primeservice/corps.model';
import { CorpsService } from './corps.service';

@Component({
  selector: 'jhi-corps-update',
  templateUrl: './corps-update.component.html'
})
export class CorpsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    libelleCorps: [null, [Validators.required]]
  });

  constructor(protected corpsService: CorpsService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ corps }) => {
      this.updateForm(corps);
    });
  }

  updateForm(corps: ICorps): void {
    this.editForm.patchValue({
      id: corps.id,
      libelleCorps: corps.libelleCorps
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const corps = this.createFromForm();
    if (corps.id !== undefined) {
      this.subscribeToSaveResponse(this.corpsService.update(corps));
    } else {
      this.subscribeToSaveResponse(this.corpsService.create(corps));
    }
  }

  private createFromForm(): ICorps {
    return {
      ...new Corps(),
      id: this.editForm.get(['id'])!.value,
      libelleCorps: this.editForm.get(['libelleCorps'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICorps>>): void {
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
