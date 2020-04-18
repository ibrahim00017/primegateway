import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { AgentService } from 'app/entities/primeservice/agent/agent.service';
import { IAgent, Agent } from 'app/shared/model/primeservice/agent.model';
import { SituationMatrimoniale } from 'app/shared/model/enumerations/situation-matrimoniale.model';
import { Statut } from 'app/shared/model/enumerations/statut.model';

describe('Service Tests', () => {
  describe('Agent Service', () => {
    let injector: TestBed;
    let service: AgentService;
    let httpMock: HttpTestingController;
    let elemDefault: IAgent;
    let expectedResult: IAgent | IAgent[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(AgentService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Agent(
        0,
        0,
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        SituationMatrimoniale.MARIE,
        0,
        Statut.ACE
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateNaiss: currentDate.format(DATE_TIME_FORMAT),
            datePriseServ: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Agent', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateNaiss: currentDate.format(DATE_TIME_FORMAT),
            datePriseServ: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateNaiss: currentDate,
            datePriseServ: currentDate
          },
          returnedFromService
        );

        service.create(new Agent()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Agent', () => {
        const returnedFromService = Object.assign(
          {
            matricule: 1,
            nom: 'BBBBBB',
            prenoms: 'BBBBBB',
            dateNaiss: currentDate.format(DATE_TIME_FORMAT),
            lieuNaiss: 'BBBBBB',
            contact: 'BBBBBB',
            email: 'BBBBBB',
            adresse: 'BBBBBB',
            datePriseServ: currentDate.format(DATE_TIME_FORMAT),
            situationMatrim: 'BBBBBB',
            nombreEnfts: 1,
            statut: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateNaiss: currentDate,
            datePriseServ: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Agent', () => {
        const returnedFromService = Object.assign(
          {
            matricule: 1,
            nom: 'BBBBBB',
            prenoms: 'BBBBBB',
            dateNaiss: currentDate.format(DATE_TIME_FORMAT),
            lieuNaiss: 'BBBBBB',
            contact: 'BBBBBB',
            email: 'BBBBBB',
            adresse: 'BBBBBB',
            datePriseServ: currentDate.format(DATE_TIME_FORMAT),
            situationMatrim: 'BBBBBB',
            nombreEnfts: 1,
            statut: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateNaiss: currentDate,
            datePriseServ: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Agent', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
