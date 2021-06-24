import { Router } from 'express';
import InfoController from '@/application/controllers/info.controller';
import Route from '@interfaces/routes.interface';

class InfoRoutes implements Route {
  path = '/repository/info';
  router = Router();
  infoController = new InfoController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.infoController.getRepositoryInfo);
  }
}

export default InfoRoutes;
