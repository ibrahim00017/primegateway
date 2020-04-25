import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ImpulsionService } from 'app/entities/impulsion/impulsion.service';
import { IImpulsion, Impulsion } from 'app/shared/model/impulsion.model';

describe('Service Tests', () => {
  describe('Impulsion Service', () => {
    let injector: TestBed;
    let service: ImpulsionService;
    let httpMock: HttpTestingController;
    let elemDefault: IImpulsion;
    let expectedResult: IImpulsion | IImpulsion[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ImpulsionService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Impulsion(0, 0, 'AAAAAAA', 'AAAAAAA', 0, 0, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            datePriseService: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should return a list of Impulsion', () => {
        const returnedFromService = Object.assign(
          {
            matricule: 1,
            nom: 'BBBBBB',
            prenoms: 'BBBBBB',
            nombreDeJour: 1,
            montant: 1,
            datePriseService: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datePriseService: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
