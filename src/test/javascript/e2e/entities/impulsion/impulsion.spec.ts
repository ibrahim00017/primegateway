import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ImpulsionComponentsPage } from './impulsion.page-object';

const expect = chai.expect;

describe('Impulsion e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let impulsionComponentsPage: ImpulsionComponentsPage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Impulsions', async () => {
    await navBarPage.goToEntity('impulsion');
    impulsionComponentsPage = new ImpulsionComponentsPage();
    await browser.wait(ec.visibilityOf(impulsionComponentsPage.title), 5000);
    expect(await impulsionComponentsPage.getTitle()).to.eq('primegatewayApp.impulsion.home.title');
    await browser.wait(ec.or(ec.visibilityOf(impulsionComponentsPage.entities), ec.visibilityOf(impulsionComponentsPage.noResult)), 1000);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
