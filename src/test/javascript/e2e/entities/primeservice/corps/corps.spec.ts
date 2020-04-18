import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { CorpsComponentsPage, CorpsDeleteDialog, CorpsUpdatePage } from './corps.page-object';

const expect = chai.expect;

describe('Corps e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let corpsComponentsPage: CorpsComponentsPage;
  let corpsUpdatePage: CorpsUpdatePage;
  let corpsDeleteDialog: CorpsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Corps', async () => {
    await navBarPage.goToEntity('corps');
    corpsComponentsPage = new CorpsComponentsPage();
    await browser.wait(ec.visibilityOf(corpsComponentsPage.title), 5000);
    expect(await corpsComponentsPage.getTitle()).to.eq('primegatewayApp.primeserviceCorps.home.title');
    await browser.wait(ec.or(ec.visibilityOf(corpsComponentsPage.entities), ec.visibilityOf(corpsComponentsPage.noResult)), 1000);
  });

  it('should load create Corps page', async () => {
    await corpsComponentsPage.clickOnCreateButton();
    corpsUpdatePage = new CorpsUpdatePage();
    expect(await corpsUpdatePage.getPageTitle()).to.eq('primegatewayApp.primeserviceCorps.home.createOrEditLabel');
    await corpsUpdatePage.cancel();
  });

  it('should create and save Corps', async () => {
    const nbButtonsBeforeCreate = await corpsComponentsPage.countDeleteButtons();

    await corpsComponentsPage.clickOnCreateButton();

    await promise.all([corpsUpdatePage.setLibelleCorpsInput('libelleCorps')]);

    expect(await corpsUpdatePage.getLibelleCorpsInput()).to.eq('libelleCorps', 'Expected LibelleCorps value to be equals to libelleCorps');

    await corpsUpdatePage.save();
    expect(await corpsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await corpsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Corps', async () => {
    const nbButtonsBeforeDelete = await corpsComponentsPage.countDeleteButtons();
    await corpsComponentsPage.clickOnLastDeleteButton();

    corpsDeleteDialog = new CorpsDeleteDialog();
    expect(await corpsDeleteDialog.getDialogTitle()).to.eq('primegatewayApp.primeserviceCorps.delete.question');
    await corpsDeleteDialog.clickOnConfirmButton();

    expect(await corpsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
