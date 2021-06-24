import { isLineableExtension } from '@/domain/utils/ExtensionUtils';
import { FileExtensionCountDTO } from '../../dto/FileExtensionCountDTO';
import { CalculationStrategyBuilder } from './calculators/strategies/CalculationStrategyBuilder';
import { GithubScraperTemplate } from './GithubScraperTemplate';

export class GithubFileScraper extends GithubScraperTemplate {
  async scrap(): Promise<void> {
    const pageHtml = await this.getPageHtml();
    const content = pageHtml
      .split('<div class="text-mono f6 flex-auto pr-3 flex-order-2 flex-md-order-1">')[1]
      .split('</div>')[0]
      .split('<span class="file-info-divider"></span>');

    const extension = this.path.split('').reverse().join('').split('.')[0].split('').reverse().join('');
    if (!extension.includes('/')) {
      const lines = isLineableExtension(extension) ? this.countHtmlContentLines(content[0]) : 0;
      const bytes = this.getHtmlFileSizeInBytes(content[isLineableExtension(extension) ? 1 : 0]);
      const newCount = new FileExtensionCountDTO(extension, lines, bytes);
      const extensionIndex = this.fileExtensionCounts.findIndex(fileExtensionCount => fileExtensionCount.getExtension() === extension);
      extensionIndex > 0 ? this.fileExtensionCounts[extensionIndex].aggregate(newCount) : this.fileExtensionCounts.push(newCount);
    }
  }

  private countHtmlContentLines(content: string): number {
    return Number(content.split('lines')[0].trim());
  }

  private getHtmlFileSizeInBytes(content: string): number {
    const size = content.trim().split(' ')[0];
    const unit = content.trim().split(' ')[1];
    return CalculationStrategyBuilder.build(unit).calculate(Number(size));
  }
}
