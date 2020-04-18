import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IAffectation, Affectation } from 'app/shared/model/primeservice/affectation.model';
import { AffectationService } from './affectation.service';
import { IAgent } from 'app/shared/model/primeservice/agent.model';
import { AgentService } from 'app/entities/primeservice/agent/agent.service';
import { IDirection } from 'app/shared/model/primeservice/direction.model';
import { DirectionService } from 'app/entities/primeservice/direction/direction.service';

type SelectableEntity = IAgent | IDirection;

@Component({
  selector: 'jhi-affectation-update',
  templateUrl: './affectation-update.component.html'
})
export class AffectationUpdateComponent implements OnInit {
  isSaving = false;
  agents: IAgent[] = [];
  directions: IDirection[] = [];

  editForm = this.fb.group({
    id: [],
    dateDebut: [],
    dateFin: [],
    agent: [],
    direction: []
  });

  constructor(
    protected affectationService: AffectationService,
    protected agentService: AgentService,
    protected directionService: DirectionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ affectation }) => {
      if (!affectation.id) {
        const today = moment().startOf('day');
        affectation.dateDebut = today;
        affectation.dateFin = today;
      }

      this.updateForm(affectation);

      this.agentService
        .query({ filter: 'affectation-is-null' })
        .pipe(
          map((res: HttpResponse<IAgent[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IAgent[]) => {
          if (!affectation.agent || !affectation.agent.id) {
            this.agents = resBody;
          } else {
            this.agentService
              .find(affectation.agent.id)
              .pipe(
                map((subRes: HttpResponse<IAgent>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IAgent[]) => (this.agents = concatRes));
          }
        });

      this.directionService
        .query({ filter: 'affectation-is-null' })
        .pipe(
          map((res: HttpResponse<IDirection[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IDirection[]) => {
          if (!affectation.direction || !affectation.direction.id) {
            this.directions = resBody;
          } else {
            this.directionService
              .find(affectation.direction.id)
              .pipe(
                map((subRes: HttpResponse<IDirection>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IDirection[]) => (this.directions = concatRes));
          }
        });
    });
  }

  updateForm(affectation: IAffectation): void {
    this.editForm.patchValue({
      id: affectation.id,
      dateDebut: affectation.dateDebut ? affectation.dateDebut.format(DATE_TIME_FORMAT) : null,
      dateFin: affectation.dateFin ? affectation.dateFin.format(DATE_TIME_FORMAT) : null,
      agent: affectation.agent,
      direction: affectation.direction
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const affectation = this.createFromForm();
    if (affectation.id !== undefined) {
      this.subscribeToSaveResponse(this.affectationService.update(affectation));
    } else {
      this.subscribeToSaveResponse(this.affectationService.create(affectation));
    }
  }

  private createFromForm(): IAffectation {
    return {
      ...new Affectation(),
      id: this.editForm.get(['id'])!.value,
      dateDebut: this.editForm.get(['dateDebut'])!.value ? moment(this.editForm.get(['dateDebut'])!.value, DATE_TIME_FORMAT) : undefined,
      dateFin: this.editForm.get(['dateFin'])!.value ? moment(this.editForm.get(['dateFin'])!.value, DATE_TIME_FORMAT) : undefined,
      agent: this.editForm.get(['agent'])!.value,
      direction: this.editForm.get(['direction'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAffectation>>): void {
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
