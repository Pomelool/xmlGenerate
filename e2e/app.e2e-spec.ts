import { XmlGeneratorPage } from './app.po';

describe('xml-generator App', () => {
  let page: XmlGeneratorPage;

  beforeEach(() => {
    page = new XmlGeneratorPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
