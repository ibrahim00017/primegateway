import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { AvancementComponentsPage, AvancementDeleteDialog, AvancementUpdatePage } from './avancement.page-object';

const expect = chai.expect;

describe('Avancement e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let avancementComponentsPage: AvancementComponentsPage;
  let avancementUpdatePage: AvancementUpdatePage;
  let avancementDeleteDialog: AvancementDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Avancements', async () => {
    await navBarPage.goToEntity('avancement');
    avancementComponentsPage = new AvancementComponentsPage();
    await browser.wait(ec.visibilityOf(avancementComponentsPage.title), 5000);
    expect(await avancementComponentsPage.getTitle()).to.eq('primegatewayApp.primeserviceAvancement.home.title');
    await browser.wait(ec.or(ec.visibilityOf(avancementComponentsPage.entities), ec.visibilityOf(avancementComponentsPage.noResult)), 1000);
  });

  it('should load create Avancement page', async () => {
    await avancementComponentsPage.clickOnCreateButton();
    avancementUpdatePage = new AvancementUpdatePage();
    expect(await avancementUpdatePage.getPageTitle()).to.eq('primegatewayApp.primeserviceAvancement.home.createOrEditLabel');
    await avancementUpdatePage.cancel();
  });

  it('should create and save Avancements', async () => {
    const nbButtonsBeforeCreate = await avancementComponentsPage.countDeleteButtons();

    await avancementComponentsPage.clickOnCreateButton();

    await promise.all([
      avancementUpdatePage.setDateDebutInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      avancementUpdatePage.setDateFinInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      avancementUpdatePage.gradeSelectLastOption(),
      avancementUpdatePage.agentSelectLastOption()
    ]);

    expect(await avancementUpdatePage.getDateDebutInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateDebut value to be equals to 2000-12-31'
    );
    expect(await avancementUpdatePage.getDateFinInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateFin value to be equals to 2000-12-31'
    );

    await avancementUpdatePage.save();
    expect(await avancementUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await avancementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Avancement', async () => {
    const nbButtonsBeforeDelete = await avancementComponentsPage.countDeleteButtons();
    await avancementComponentsPage.clickOnLastDeleteButton();

    avancementDeleteDialog = new AvancementDeleteDialog();
    expect(await avancementDeleteDialog.getDialogTitle()).to.eq('primegatewayApp.primeserviceAvancement.delete.question');
    await avancementDeleteDialog.clickOnConfirmButton();

    expect(await avancementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
