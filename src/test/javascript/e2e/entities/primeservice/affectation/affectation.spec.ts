import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { AffectationComponentsPage, AffectationDeleteDialog, AffectationUpdatePage } from './affectation.page-object';

const expect = chai.expect;

describe('Affectation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let affectationComponentsPage: AffectationComponentsPage;
  let affectationUpdatePage: AffectationUpdatePage;
  let affectationDeleteDialog: AffectationDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Affectations', async () => {
    await navBarPage.goToEntity('affectation');
    affectationComponentsPage = new AffectationComponentsPage();
    await browser.wait(ec.visibilityOf(affectationComponentsPage.title), 5000);
    expect(await affectationComponentsPage.getTitle()).to.eq('primegatewayApp.primeserviceAffectation.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(affectationComponentsPage.entities), ec.visibilityOf(affectationComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Affectation page', async () => {
    await affectationComponentsPage.clickOnCreateButton();
    affectationUpdatePage = new AffectationUpdatePage();
    expect(await affectationUpdatePage.getPageTitle()).to.eq('primegatewayApp.primeserviceAffectation.home.createOrEditLabel');
    await affectationUpdatePage.cancel();
  });

  it('should create and save Affectations', async () => {
    const nbButtonsBeforeCreate = await affectationComponentsPage.countDeleteButtons();

    await affectationComponentsPage.clickOnCreateButton();

    await promise.all([
      affectationUpdatePage.setDateDebutInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      affectationUpdatePage.setDateFinInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      affectationUpdatePage.agentSelectLastOption(),
      affectationUpdatePage.directionSelectLastOption()
    ]);

    expect(await affectationUpdatePage.getDateDebutInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateDebut value to be equals to 2000-12-31'
    );
    expect(await affectationUpdatePage.getDateFinInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateFin value to be equals to 2000-12-31'
    );

    await affectationUpdatePage.save();
    expect(await affectationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await affectationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Affectation', async () => {
    const nbButtonsBeforeDelete = await affectationComponentsPage.countDeleteButtons();
    await affectationComponentsPage.clickOnLastDeleteButton();

    affectationDeleteDialog = new AffectationDeleteDialog();
    expect(await affectationDeleteDialog.getDialogTitle()).to.eq('primegatewayApp.primeserviceAffectation.delete.question');
    await affectationDeleteDialog.clickOnConfirmButton();

    expect(await affectationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
