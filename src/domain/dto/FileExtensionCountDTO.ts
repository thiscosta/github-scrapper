export class FileExtensionCountDTO {
  private extension: string;
  private count: number;
  private lines: number;
  private bytes: number;

  constructor(extension: string, lines?: number, bytes?: number) {
    this.extension = extension;
    this.count = 1;
    this.lines = lines || 0;
    this.bytes = bytes || 0;
  }

  aggregate(count: FileExtensionCountDTO) {
    this.incrementCount();
    this.incrementLines(count.getLines());
    this.incrementBytes(count.getBytes());
  }

  private incrementCount() {
    this.count += 1;
  }

  private incrementLines(lines: number) {
    this.lines += lines;
  }

  private incrementBytes(bytes: number) {
    this.bytes += bytes;
  }

  getExtension(): string {
    return this.extension;
  }

  getCount(): number {
    return this.count;
  }

  getLines(): number {
    return this.lines;
  }

  getBytes(): number {
    return this.bytes;
  }
}
