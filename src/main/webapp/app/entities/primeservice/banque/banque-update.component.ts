import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBanque, Banque } from 'app/shared/model/primeservice/banque.model';
import { BanqueService } from './banque.service';

@Component({
  selector: 'jhi-banque-update',
  templateUrl: './banque-update.component.html'
})
export class BanqueUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    codeBanque: [null, [Validators.required]],
    nomBanque: [null, [Validators.required]],
    siegeSocial: [],
    telephone: [],
    fax: [],
    email: []
  });

  constructor(protected banqueService: BanqueService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ banque }) => {
      this.updateForm(banque);
    });
  }

  updateForm(banque: IBanque): void {
    this.editForm.patchValue({
      id: banque.id,
      codeBanque: banque.codeBanque,
      nomBanque: banque.nomBanque,
      siegeSocial: banque.siegeSocial,
      telephone: banque.telephone,
      fax: banque.fax,
      email: banque.email
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const banque = this.createFromForm();
    if (banque.id !== undefined) {
      this.subscribeToSaveResponse(this.banqueService.update(banque));
    } else {
      this.subscribeToSaveResponse(this.banqueService.create(banque));
    }
  }

  private createFromForm(): IBanque {
    return {
      ...new Banque(),
      id: this.editForm.get(['id'])!.value,
      codeBanque: this.editForm.get(['codeBanque'])!.value,
      nomBanque: this.editForm.get(['nomBanque'])!.value,
      siegeSocial: this.editForm.get(['siegeSocial'])!.value,
      telephone: this.editForm.get(['telephone'])!.value,
      fax: this.editForm.get(['fax'])!.value,
      email: this.editForm.get(['email'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBanque>>): void {
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
