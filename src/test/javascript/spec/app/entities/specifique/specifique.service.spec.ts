import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SpecifiqueService } from 'app/entities/specifique/specifique.service';
import { ISpecifique, Specifique } from 'app/shared/model/specifique.model';

describe('Service Tests', () => {
  describe('Specifique Service', () => {
    let injector: TestBed;
    let service: SpecifiqueService;
    let httpMock: HttpTestingController;
    let elemDefault: ISpecifique;
    let expectedResult: ISpecifique | ISpecifique[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(SpecifiqueService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Specifique(0, 0, 'AAAAAAA', 'AAAAAAA', 0, 0, 0, currentDate);
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

      it('should return a list of Specifique', () => {
        const returnedFromService = Object.assign(
          {
            matricule: 1,
            nom: 'BBBBBB',
            prenoms: 'BBBBBB',
            nombreDeJours: 1,
            taux: 1,
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
