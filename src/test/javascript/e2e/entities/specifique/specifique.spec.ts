import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SpecifiqueComponentsPage } from './specifique.page-object';

const expect = chai.expect;

describe('Specifique e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let specifiqueComponentsPage: SpecifiqueComponentsPage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Specifiques', async () => {
    await navBarPage.goToEntity('specifique');
    specifiqueComponentsPage = new SpecifiqueComponentsPage();
    await browser.wait(ec.visibilityOf(specifiqueComponentsPage.title), 5000);
    expect(await specifiqueComponentsPage.getTitle()).to.eq('primegatewayApp.specifique.home.title');
    await browser.wait(ec.or(ec.visibilityOf(specifiqueComponentsPage.entities), ec.visibilityOf(specifiqueComponentsPage.noResult)), 1000);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
