import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { PrimeComponentsPage, PrimeDeleteDialog, PrimeUpdatePage } from './prime.page-object';

const expect = chai.expect;

describe('Prime e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let primeComponentsPage: PrimeComponentsPage;
  let primeUpdatePage: PrimeUpdatePage;
  let primeDeleteDialog: PrimeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Primes', async () => {
    await navBarPage.goToEntity('prime');
    primeComponentsPage = new PrimeComponentsPage();
    await browser.wait(ec.visibilityOf(primeComponentsPage.title), 5000);
    expect(await primeComponentsPage.getTitle()).to.eq('primegatewayApp.primeservicePrime.home.title');
    await browser.wait(ec.or(ec.visibilityOf(primeComponentsPage.entities), ec.visibilityOf(primeComponentsPage.noResult)), 1000);
  });

  it('should load create Prime page', async () => {
    await primeComponentsPage.clickOnCreateButton();
    primeUpdatePage = new PrimeUpdatePage();
    expect(await primeUpdatePage.getPageTitle()).to.eq('primegatewayApp.primeservicePrime.home.createOrEditLabel');
    await primeUpdatePage.cancel();
  });

  it('should create and save Primes', async () => {
    const nbButtonsBeforeCreate = await primeComponentsPage.countDeleteButtons();

    await primeComponentsPage.clickOnCreateButton();

    await promise.all([
      primeUpdatePage.setPrimeInput('prime'),
      primeUpdatePage.setTauxMensuelInput('5'),
      primeUpdatePage.typePrimeSelectLastOption()
    ]);

    expect(await primeUpdatePage.getPrimeInput()).to.eq('prime', 'Expected Prime value to be equals to prime');
    expect(await primeUpdatePage.getTauxMensuelInput()).to.eq('5', 'Expected tauxMensuel value to be equals to 5');

    await primeUpdatePage.save();
    expect(await primeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await primeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Prime', async () => {
    const nbButtonsBeforeDelete = await primeComponentsPage.countDeleteButtons();
    await primeComponentsPage.clickOnLastDeleteButton();

    primeDeleteDialog = new PrimeDeleteDialog();
    expect(await primeDeleteDialog.getDialogTitle()).to.eq('primegatewayApp.primeservicePrime.delete.question');
    await primeDeleteDialog.clickOnConfirmButton();

    expect(await primeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
