import { FileExtensionCountDTO } from '../../dto/FileExtensionCountDTO';
import { occurrences } from '../../utils/StringUtils';
import { GithubFileScraper } from './GithubFileScraper';
import { GithubScraperTemplate } from './GithubScraperTemplate';

export class GithubPageScraper extends GithubScraperTemplate {
  async scrap(): Promise<FileExtensionCountDTO[]> {
    const pageHtml = await this.getPageHtml();
    const directoriesCount = occurrences(pageHtml, 'aria-label="Directory"', true);
    const content = pageHtml.match(/<a[^<>]*class="js-navigation-open Link--primary"[^<>]*>(?<content>.*?)<\/a>/g);

    await Promise.all(
      content.map(async (content, index) => {
        const path = content.split('href="')[1].split('">')[0];
        index < directoriesCount ? await this.callNewPage(path) : await this.callNewFile(path);
      }),
    );

    return this.fileExtensionCounts;
  }

  async callNewPage(path: string): Promise<any> {
    return new GithubPageScraper(path, this.fileExtensionCounts).scrap();
  }

  async callNewFile(path: string): Promise<any> {
    return new GithubFileScraper(path, this.fileExtensionCounts).scrap();
  }
}
