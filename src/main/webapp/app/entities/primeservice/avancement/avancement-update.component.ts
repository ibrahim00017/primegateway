import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IAvancement, Avancement } from 'app/shared/model/primeservice/avancement.model';
import { AvancementService } from './avancement.service';
import { IGrade } from 'app/shared/model/primeservice/grade.model';
import { GradeService } from 'app/entities/primeservice/grade/grade.service';
import { IAgent } from 'app/shared/model/primeservice/agent.model';
import { AgentService } from 'app/entities/primeservice/agent/agent.service';

type SelectableEntity = IGrade | IAgent;

@Component({
  selector: 'jhi-avancement-update',
  templateUrl: './avancement-update.component.html'
})
export class AvancementUpdateComponent implements OnInit {
  isSaving = false;
  grades: IGrade[] = [];
  agents: IAgent[] = [];

  editForm = this.fb.group({
    id: [],
    dateDebut: [],
    dateFin: [],
    grade: [],
    agent: []
  });

  constructor(
    protected avancementService: AvancementService,
    protected gradeService: GradeService,
    protected agentService: AgentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ avancement }) => {
      if (!avancement.id) {
        const today = moment().startOf('day');
        avancement.dateDebut = today;
        avancement.dateFin = today;
      }

      this.updateForm(avancement);

      this.gradeService
        .query({ filter: 'avancement-is-null' })
        .pipe(
          map((res: HttpResponse<IGrade[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IGrade[]) => {
          if (!avancement.grade || !avancement.grade.id) {
            this.grades = resBody;
          } else {
            this.gradeService
              .find(avancement.grade.id)
              .pipe(
                map((subRes: HttpResponse<IGrade>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IGrade[]) => (this.grades = concatRes));
          }
        });

      this.agentService
        .query({ filter: 'avancement-is-null' })
        .pipe(
          map((res: HttpResponse<IAgent[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IAgent[]) => {
          if (!avancement.agent || !avancement.agent.id) {
            this.agents = resBody;
          } else {
            this.agentService
              .find(avancement.agent.id)
              .pipe(
                map((subRes: HttpResponse<IAgent>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IAgent[]) => (this.agents = concatRes));
          }
        });
    });
  }

  updateForm(avancement: IAvancement): void {
    this.editForm.patchValue({
      id: avancement.id,
      dateDebut: avancement.dateDebut ? avancement.dateDebut.format(DATE_TIME_FORMAT) : null,
      dateFin: avancement.dateFin ? avancement.dateFin.format(DATE_TIME_FORMAT) : null,
      grade: avancement.grade,
      agent: avancement.agent
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const avancement = this.createFromForm();
    if (avancement.id !== undefined) {
      this.subscribeToSaveResponse(this.avancementService.update(avancement));
    } else {
      this.subscribeToSaveResponse(this.avancementService.create(avancement));
    }
  }

  private createFromForm(): IAvancement {
    return {
      ...new Avancement(),
      id: this.editForm.get(['id'])!.value,
      dateDebut: this.editForm.get(['dateDebut'])!.value ? moment(this.editForm.get(['dateDebut'])!.value, DATE_TIME_FORMAT) : undefined,
      dateFin: this.editForm.get(['dateFin'])!.value ? moment(this.editForm.get(['dateFin'])!.value, DATE_TIME_FORMAT) : undefined,
      grade: this.editForm.get(['grade'])!.value,
      agent: this.editForm.get(['agent'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAvancement>>): void {
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
