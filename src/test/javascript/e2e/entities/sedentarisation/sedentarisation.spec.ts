import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SedentarisationComponentsPage } from './sedentarisation.page-object';

const expect = chai.expect;

describe('Sedentarisation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let sedentarisationComponentsPage: SedentarisationComponentsPage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Sedentarisations', async () => {
    await navBarPage.goToEntity('sedentarisation');
    sedentarisationComponentsPage = new SedentarisationComponentsPage();
    await browser.wait(ec.visibilityOf(sedentarisationComponentsPage.title), 5000);
    expect(await sedentarisationComponentsPage.getTitle()).to.eq('primegatewayApp.sedentarisation.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(sedentarisationComponentsPage.entities), ec.visibilityOf(sedentarisationComponentsPage.noResult)),
      1000
    );
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
