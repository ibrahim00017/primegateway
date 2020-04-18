import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ChangementComponentsPage, ChangementDeleteDialog, ChangementUpdatePage } from './changement.page-object';

const expect = chai.expect;

describe('Changement e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let changementComponentsPage: ChangementComponentsPage;
  let changementUpdatePage: ChangementUpdatePage;
  let changementDeleteDialog: ChangementDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Changements', async () => {
    await navBarPage.goToEntity('changement');
    changementComponentsPage = new ChangementComponentsPage();
    await browser.wait(ec.visibilityOf(changementComponentsPage.title), 5000);
    expect(await changementComponentsPage.getTitle()).to.eq('primegatewayApp.primeserviceChangement.home.title');
    await browser.wait(ec.or(ec.visibilityOf(changementComponentsPage.entities), ec.visibilityOf(changementComponentsPage.noResult)), 1000);
  });

  it('should load create Changement page', async () => {
    await changementComponentsPage.clickOnCreateButton();
    changementUpdatePage = new ChangementUpdatePage();
    expect(await changementUpdatePage.getPageTitle()).to.eq('primegatewayApp.primeserviceChangement.home.createOrEditLabel');
    await changementUpdatePage.cancel();
  });

  it('should create and save Changements', async () => {
    const nbButtonsBeforeCreate = await changementComponentsPage.countDeleteButtons();

    await changementComponentsPage.clickOnCreateButton();

    await promise.all([
      changementUpdatePage.setDateDebutInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      changementUpdatePage.setDatefinInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      changementUpdatePage.agentSelectLastOption(),
      changementUpdatePage.corpsSelectLastOption()
    ]);

    expect(await changementUpdatePage.getDateDebutInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateDebut value to be equals to 2000-12-31'
    );
    expect(await changementUpdatePage.getDatefinInput()).to.contain(
      '2001-01-01T02:30',
      'Expected datefin value to be equals to 2000-12-31'
    );

    await changementUpdatePage.save();
    expect(await changementUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await changementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Changement', async () => {
    const nbButtonsBeforeDelete = await changementComponentsPage.countDeleteButtons();
    await changementComponentsPage.clickOnLastDeleteButton();

    changementDeleteDialog = new ChangementDeleteDialog();
    expect(await changementDeleteDialog.getDialogTitle()).to.eq('primegatewayApp.primeserviceChangement.delete.question');
    await changementDeleteDialog.clickOnConfirmButton();

    expect(await changementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
