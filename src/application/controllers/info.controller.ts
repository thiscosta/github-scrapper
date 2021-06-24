import { NextFunction, Request, Response } from 'express';
import { GithubPageScraper } from '@/domain/services/scrappers/GithubPageScraper';

class InfoController {
  getRepositoryInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { owner, repository } = req.query
      const records = await new GithubPageScraper(`${owner}/${repository}`).scrap();
      res.status(200).json({ records });
    } catch (error) {
      next(error);
    }
  };
}

export default InfoController;
