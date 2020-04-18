import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { AnneeComponentsPage, AnneeDeleteDialog, AnneeUpdatePage } from './annee.page-object';

const expect = chai.expect;

describe('Annee e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let anneeComponentsPage: AnneeComponentsPage;
  let anneeUpdatePage: AnneeUpdatePage;
  let anneeDeleteDialog: AnneeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Annees', async () => {
    await navBarPage.goToEntity('annee');
    anneeComponentsPage = new AnneeComponentsPage();
    await browser.wait(ec.visibilityOf(anneeComponentsPage.title), 5000);
    expect(await anneeComponentsPage.getTitle()).to.eq('primegatewayApp.primeserviceAnnee.home.title');
    await browser.wait(ec.or(ec.visibilityOf(anneeComponentsPage.entities), ec.visibilityOf(anneeComponentsPage.noResult)), 1000);
  });

  it('should load create Annee page', async () => {
    await anneeComponentsPage.clickOnCreateButton();
    anneeUpdatePage = new AnneeUpdatePage();
    expect(await anneeUpdatePage.getPageTitle()).to.eq('primegatewayApp.primeserviceAnnee.home.createOrEditLabel');
    await anneeUpdatePage.cancel();
  });

  it('should create and save Annees', async () => {
    const nbButtonsBeforeCreate = await anneeComponentsPage.countDeleteButtons();

    await anneeComponentsPage.clickOnCreateButton();

    await promise.all([anneeUpdatePage.setCodeAnneeInput('5')]);

    expect(await anneeUpdatePage.getCodeAnneeInput()).to.eq('5', 'Expected codeAnnee value to be equals to 5');

    await anneeUpdatePage.save();
    expect(await anneeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await anneeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Annee', async () => {
    const nbButtonsBeforeDelete = await anneeComponentsPage.countDeleteButtons();
    await anneeComponentsPage.clickOnLastDeleteButton();

    anneeDeleteDialog = new AnneeDeleteDialog();
    expect(await anneeDeleteDialog.getDialogTitle()).to.eq('primegatewayApp.primeserviceAnnee.delete.question');
    await anneeDeleteDialog.clickOnConfirmButton();

    expect(await anneeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
