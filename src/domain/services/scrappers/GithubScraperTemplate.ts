import { FileExtensionCountDTO } from '@/domain/dto/FileExtensionCountDTO';
import axios from 'axios';

export abstract class GithubScraperTemplate {
  protected path: string;
  protected fileExtensionCounts: FileExtensionCountDTO[];

  constructor(path: string, fileExtensionCounts?: FileExtensionCountDTO[]) {
    this.path = path;
    this.fileExtensionCounts = fileExtensionCounts || [];
  }

  protected async getPageHtml(): Promise<string> {
    return (await axios.get(`https://github.com/${this.path}`)).data;
  }

  abstract scrap(): Promise<FileExtensionCountDTO[] | void>;
}
