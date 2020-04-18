import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { AgentComponentsPage, AgentDeleteDialog, AgentUpdatePage } from './agent.page-object';

const expect = chai.expect;

describe('Agent e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let agentComponentsPage: AgentComponentsPage;
  let agentUpdatePage: AgentUpdatePage;
  let agentDeleteDialog: AgentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Agents', async () => {
    await navBarPage.goToEntity('agent');
    agentComponentsPage = new AgentComponentsPage();
    await browser.wait(ec.visibilityOf(agentComponentsPage.title), 5000);
    expect(await agentComponentsPage.getTitle()).to.eq('primegatewayApp.primeserviceAgent.home.title');
    await browser.wait(ec.or(ec.visibilityOf(agentComponentsPage.entities), ec.visibilityOf(agentComponentsPage.noResult)), 1000);
  });

  it('should load create Agent page', async () => {
    await agentComponentsPage.clickOnCreateButton();
    agentUpdatePage = new AgentUpdatePage();
    expect(await agentUpdatePage.getPageTitle()).to.eq('primegatewayApp.primeserviceAgent.home.createOrEditLabel');
    await agentUpdatePage.cancel();
  });

  it('should create and save Agents', async () => {
    const nbButtonsBeforeCreate = await agentComponentsPage.countDeleteButtons();

    await agentComponentsPage.clickOnCreateButton();

    await promise.all([
      agentUpdatePage.setMatriculeInput('5'),
      agentUpdatePage.setNomInput('nom'),
      agentUpdatePage.setPrenomsInput('prenoms'),
      agentUpdatePage.setDateNaissInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      agentUpdatePage.setLieuNaissInput('lieuNaiss'),
      agentUpdatePage.setContactInput('contact'),
      agentUpdatePage.setEmailInput('email'),
      agentUpdatePage.setAdresseInput('adresse'),
      agentUpdatePage.setDatePriseServInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      agentUpdatePage.situationMatrimSelectLastOption(),
      agentUpdatePage.setNombreEnftsInput('5'),
      agentUpdatePage.statutSelectLastOption(),
      agentUpdatePage.fonctionSelectLastOption(),
      agentUpdatePage.directionSelectLastOption(),
      agentUpdatePage.gradeSelectLastOption(),
      agentUpdatePage.corpsSelectLastOption()
    ]);

    expect(await agentUpdatePage.getMatriculeInput()).to.eq('5', 'Expected matricule value to be equals to 5');
    expect(await agentUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');
    expect(await agentUpdatePage.getPrenomsInput()).to.eq('prenoms', 'Expected Prenoms value to be equals to prenoms');
    expect(await agentUpdatePage.getDateNaissInput()).to.contain('2001-01-01T02:30', 'Expected dateNaiss value to be equals to 2000-12-31');
    expect(await agentUpdatePage.getLieuNaissInput()).to.eq('lieuNaiss', 'Expected LieuNaiss value to be equals to lieuNaiss');
    expect(await agentUpdatePage.getContactInput()).to.eq('contact', 'Expected Contact value to be equals to contact');
    expect(await agentUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await agentUpdatePage.getAdresseInput()).to.eq('adresse', 'Expected Adresse value to be equals to adresse');
    expect(await agentUpdatePage.getDatePriseServInput()).to.contain(
      '2001-01-01T02:30',
      'Expected datePriseServ value to be equals to 2000-12-31'
    );
    expect(await agentUpdatePage.getNombreEnftsInput()).to.eq('5', 'Expected nombreEnfts value to be equals to 5');

    await agentUpdatePage.save();
    expect(await agentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await agentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Agent', async () => {
    const nbButtonsBeforeDelete = await agentComponentsPage.countDeleteButtons();
    await agentComponentsPage.clickOnLastDeleteButton();

    agentDeleteDialog = new AgentDeleteDialog();
    expect(await agentDeleteDialog.getDialogTitle()).to.eq('primegatewayApp.primeserviceAgent.delete.question');
    await agentDeleteDialog.clickOnConfirmButton();

    expect(await agentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
