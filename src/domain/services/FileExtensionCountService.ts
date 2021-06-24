import { FileExtensionCountDTO } from '@/domain/dto/FileExtensionCountDTO';

export class FileExtensionCountService {
  private counts: FileExtensionCountDTO[];
  constructor(counts: FileExtensionCountDTO[] = []) {
    this.counts = counts;
  }

  getCounts(): FileExtensionCountDTO[] {
    return this.counts;
  }

  createOrIncrementCounts(counts: FileExtensionCountDTO[]): void {
    counts.forEach(count => this.createOrIncrementCount(count));
  }

  private createOrIncrementCount(count: FileExtensionCountDTO): void {
    const foundCountIndex = this.counts.findIndex(savedCount => savedCount.getExtension() === count.getExtension());
    foundCountIndex > 0 ? this.counts[foundCountIndex].aggregate(count) : this.counts.push(count);
  }
}
