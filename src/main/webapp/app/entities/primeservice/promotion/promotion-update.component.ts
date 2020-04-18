import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPromotion, Promotion } from 'app/shared/model/primeservice/promotion.model';
import { PromotionService } from './promotion.service';
import { IAgent } from 'app/shared/model/primeservice/agent.model';
import { AgentService } from 'app/entities/primeservice/agent/agent.service';
import { IFonction } from 'app/shared/model/primeservice/fonction.model';
import { FonctionService } from 'app/entities/primeservice/fonction/fonction.service';

type SelectableEntity = IAgent | IFonction;

@Component({
  selector: 'jhi-promotion-update',
  templateUrl: './promotion-update.component.html'
})
export class PromotionUpdateComponent implements OnInit {
  isSaving = false;
  agents: IAgent[] = [];
  fonctions: IFonction[] = [];

  editForm = this.fb.group({
    id: [],
    dateDebut: [],
    dateFin: [],
    agent: [],
    fonction: []
  });

  constructor(
    protected promotionService: PromotionService,
    protected agentService: AgentService,
    protected fonctionService: FonctionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ promotion }) => {
      if (!promotion.id) {
        const today = moment().startOf('day');
        promotion.dateDebut = today;
        promotion.dateFin = today;
      }

      this.updateForm(promotion);

      this.agentService
        .query({ filter: 'promotion-is-null' })
        .pipe(
          map((res: HttpResponse<IAgent[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IAgent[]) => {
          if (!promotion.agent || !promotion.agent.id) {
            this.agents = resBody;
          } else {
            this.agentService
              .find(promotion.agent.id)
              .pipe(
                map((subRes: HttpResponse<IAgent>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IAgent[]) => (this.agents = concatRes));
          }
        });

      this.fonctionService
        .query({ filter: 'promotion-is-null' })
        .pipe(
          map((res: HttpResponse<IFonction[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IFonction[]) => {
          if (!promotion.fonction || !promotion.fonction.id) {
            this.fonctions = resBody;
          } else {
            this.fonctionService
              .find(promotion.fonction.id)
              .pipe(
                map((subRes: HttpResponse<IFonction>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IFonction[]) => (this.fonctions = concatRes));
          }
        });
    });
  }

  updateForm(promotion: IPromotion): void {
    this.editForm.patchValue({
      id: promotion.id,
      dateDebut: promotion.dateDebut ? promotion.dateDebut.format(DATE_TIME_FORMAT) : null,
      dateFin: promotion.dateFin ? promotion.dateFin.format(DATE_TIME_FORMAT) : null,
      agent: promotion.agent,
      fonction: promotion.fonction
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const promotion = this.createFromForm();
    if (promotion.id !== undefined) {
      this.subscribeToSaveResponse(this.promotionService.update(promotion));
    } else {
      this.subscribeToSaveResponse(this.promotionService.create(promotion));
    }
  }

  private createFromForm(): IPromotion {
    return {
      ...new Promotion(),
      id: this.editForm.get(['id'])!.value,
      dateDebut: this.editForm.get(['dateDebut'])!.value ? moment(this.editForm.get(['dateDebut'])!.value, DATE_TIME_FORMAT) : undefined,
      dateFin: this.editForm.get(['dateFin'])!.value ? moment(this.editForm.get(['dateFin'])!.value, DATE_TIME_FORMAT) : undefined,
      agent: this.editForm.get(['agent'])!.value,
      fonction: this.editForm.get(['fonction'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPromotion>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
