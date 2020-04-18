import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { TrimestreComponentsPage, TrimestreDeleteDialog, TrimestreUpdatePage } from './trimestre.page-object';

const expect = chai.expect;

describe('Trimestre e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let trimestreComponentsPage: TrimestreComponentsPage;
  let trimestreUpdatePage: TrimestreUpdatePage;
  let trimestreDeleteDialog: TrimestreDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Trimestres', async () => {
    await navBarPage.goToEntity('trimestre');
    trimestreComponentsPage = new TrimestreComponentsPage();
    await browser.wait(ec.visibilityOf(trimestreComponentsPage.title), 5000);
    expect(await trimestreComponentsPage.getTitle()).to.eq('primegatewayApp.primeserviceTrimestre.home.title');
    await browser.wait(ec.or(ec.visibilityOf(trimestreComponentsPage.entities), ec.visibilityOf(trimestreComponentsPage.noResult)), 1000);
  });

  it('should load create Trimestre page', async () => {
    await trimestreComponentsPage.clickOnCreateButton();
    trimestreUpdatePage = new TrimestreUpdatePage();
    expect(await trimestreUpdatePage.getPageTitle()).to.eq('primegatewayApp.primeserviceTrimestre.home.createOrEditLabel');
    await trimestreUpdatePage.cancel();
  });

  it('should create and save Trimestres', async () => {
    const nbButtonsBeforeCreate = await trimestreComponentsPage.countDeleteButtons();

    await trimestreComponentsPage.clickOnCreateButton();

    await promise.all([trimestreUpdatePage.setCodeTrimestreInput('5')]);

    expect(await trimestreUpdatePage.getCodeTrimestreInput()).to.eq('5', 'Expected codeTrimestre value to be equals to 5');

    await trimestreUpdatePage.save();
    expect(await trimestreUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await trimestreComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Trimestre', async () => {
    const nbButtonsBeforeDelete = await trimestreComponentsPage.countDeleteButtons();
    await trimestreComponentsPage.clickOnLastDeleteButton();

    trimestreDeleteDialog = new TrimestreDeleteDialog();
    expect(await trimestreDeleteDialog.getDialogTitle()).to.eq('primegatewayApp.primeserviceTrimestre.delete.question');
    await trimestreDeleteDialog.clickOnConfirmButton();

    expect(await trimestreComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
