import { FileExtensionCountDTO } from '@/domain/dto/FileExtensionCountDTO';
import nock from 'nock';
import { GithubFileScraper } from '../GithubFileScraper';
import { GithubPageScraper } from '../GithubPageScraper';
import { githubFileWithLines, githubFilesWithoutLines, githubPageWith2FoldersAnd5Files } from './mock';

describe('[Scrappers]', () => {
  describe('File', () => {
    it('should return the correct info from github html file', async () => {
      const fakeGithubFile = 'thiscosta/thiscosta/blob/master/README.md';
      nock('https://api.allorigins.win/raw')
        .get('')
        .query({
          url: `https://github.com/${fakeGithubFile}`,
        })
        .reply(200, githubFileWithLines);

      const fileCounts = [];
      await new GithubFileScraper(fakeGithubFile, fileCounts).scrap();
      expect(fileCounts[0]).toStrictEqual(new FileExtensionCountDTO('md', 29, 1095.68));
    });

    it('should return the correct info from github png file', async () => {
      const fakeGithubFile = 'thiscosta/spoticlone/blob/master/public/favicon.png';
      nock('https://api.allorigins.win/raw')
        .get('')
        .query({
          url: `https://github.com/${fakeGithubFile}`,
        })
        .reply(200, githubFilesWithoutLines);

      const fileCounts = [];
      await new GithubFileScraper(fakeGithubFile, fileCounts).scrap();
      expect(fileCounts[0]).toStrictEqual(new FileExtensionCountDTO('png', 0, 1157.12));
    });
  });

  describe('Page', () => {
    it('should call the new page method 2 times and file scrapper 5 times', async () => {
      nock('https://api.allorigins.win/raw')
        .get('')
        .query({
          url: `https://github.com/thiscosta/test`,
        })
        .reply(200, githubPageWith2FoldersAnd5Files);

      const fileCounts = [new FileExtensionCountDTO('test', 0, 0)];

      const callNewPageSpy = jest.spyOn(GithubPageScraper.prototype, 'callNewPage').mockImplementation(jest.fn());
      const callNewFileSpy = jest.spyOn(GithubPageScraper.prototype, 'callNewFile').mockImplementation(async _path => {
        fileCounts[0].aggregate(new FileExtensionCountDTO('test', 20, 10));
      });

      await new GithubPageScraper('thiscosta/test', fileCounts).scrap();
      expect(callNewPageSpy).toHaveBeenCalledTimes(2);
      expect(callNewFileSpy).toHaveBeenCalledTimes(5);
      expect(fileCounts[0].getBytes()).toBe(50);
      expect(fileCounts[0].getCount()).toBe(6); //1 on instance creation on line 47 + 5 new files calls
      expect(fileCounts[0].getLines()).toBe(100);
    });
  });
});
