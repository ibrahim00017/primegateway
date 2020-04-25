import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SedentarisationService } from 'app/entities/sedentarisation/sedentarisation.service';
import { ISedentarisation, Sedentarisation } from 'app/shared/model/sedentarisation.model';

describe('Service Tests', () => {
  describe('Sedentarisation Service', () => {
    let injector: TestBed;
    let service: SedentarisationService;
    let httpMock: HttpTestingController;
    let elemDefault: ISedentarisation;
    let expectedResult: ISedentarisation | ISedentarisation[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(SedentarisationService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Sedentarisation(0, 0, 'AAAAAAA', 'AAAAAAA', 0, 0, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            priseService: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should return a list of Sedentarisation', () => {
        const returnedFromService = Object.assign(
          {
            matricule: 1,
            nom: 'BBBBBB',
            prenoms: 'BBBBBB',
            nombreDeJours: 1,
            montant: 1,
            priseService: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            priseService: currentDate
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
