import request from 'supertest';
import App from '@/app';
import InfoRoute from '@/application/routes/info';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Info', () => {
  describe('[GET] /repository/info', () => {
    it('response statusCode 200 / info', () => {
      const infoRoute = new InfoRoute();
      const app = new App([infoRoute]);

      return request(app.getServer())
        .get(`${infoRoute.path}`)
        .query({
          owner: 'thiscosta',
          repository: 'typescript-patterns',
        })
        .expect(200, {
          records: [
            {
              extension: 'json',
              count: 1,
              lines: 12,
              bytes: 251,
            },
            {
              extension: 'gitignore',
              count: 1,
              lines: 1,
              bytes: 6,
            },
            {
              extension: 'ts',
              count: 34,
              lines: 543,
              bytes: 16631.760000000002,
            },
          ],
        });
    });
  });
});
