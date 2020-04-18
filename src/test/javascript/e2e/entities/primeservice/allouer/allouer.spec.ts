import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { AllouerComponentsPage, AllouerDeleteDialog, AllouerUpdatePage } from './allouer.page-object';

const expect = chai.expect;

describe('Allouer e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let allouerComponentsPage: AllouerComponentsPage;
  let allouerUpdatePage: AllouerUpdatePage;
  let allouerDeleteDialog: AllouerDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Allouers', async () => {
    await navBarPage.goToEntity('allouer');
    allouerComponentsPage = new AllouerComponentsPage();
    await browser.wait(ec.visibilityOf(allouerComponentsPage.title), 5000);
    expect(await allouerComponentsPage.getTitle()).to.eq('primegatewayApp.primeserviceAllouer.home.title');
    await browser.wait(ec.or(ec.visibilityOf(allouerComponentsPage.entities), ec.visibilityOf(allouerComponentsPage.noResult)), 1000);
  });

  it('should load create Allouer page', async () => {
    await allouerComponentsPage.clickOnCreateButton();
    allouerUpdatePage = new AllouerUpdatePage();
    expect(await allouerUpdatePage.getPageTitle()).to.eq('primegatewayApp.primeserviceAllouer.home.createOrEditLabel');
    await allouerUpdatePage.cancel();
  });

  it('should create and save Allouers', async () => {
    const nbButtonsBeforeCreate = await allouerComponentsPage.countDeleteButtons();

    await allouerComponentsPage.clickOnCreateButton();

    await promise.all([
      allouerUpdatePage.setNoteInput('5'),
      allouerUpdatePage.setNombreJoursInput('5'),
      allouerUpdatePage.setMontantInput('5'),
      allouerUpdatePage.agentSelectLastOption(),
      allouerUpdatePage.primeSelectLastOption(),
      allouerUpdatePage.anneeSelectLastOption(),
      allouerUpdatePage.trimestreSelectLastOption()
    ]);

    expect(await allouerUpdatePage.getNoteInput()).to.eq('5', 'Expected note value to be equals to 5');
    expect(await allouerUpdatePage.getNombreJoursInput()).to.eq('5', 'Expected nombreJours value to be equals to 5');
    expect(await allouerUpdatePage.getMontantInput()).to.eq('5', 'Expected montant value to be equals to 5');

    await allouerUpdatePage.save();
    expect(await allouerUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await allouerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Allouer', async () => {
    const nbButtonsBeforeDelete = await allouerComponentsPage.countDeleteButtons();
    await allouerComponentsPage.clickOnLastDeleteButton();

    allouerDeleteDialog = new AllouerDeleteDialog();
    expect(await allouerDeleteDialog.getDialogTitle()).to.eq('primegatewayApp.primeserviceAllouer.delete.question');
    await allouerDeleteDialog.clickOnConfirmButton();

    expect(await allouerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
