import { Module } from '@nestjs/common';
import { SearchModule } from './search/search.module';

@Module({
  imports: [SearchModule],
})
export class AppModule {
  configure(consumer: import('@nestjs/common').MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader(
          'Access-Control-Allow-Headers',
          'Content-Type, Authorization',
        );
        next();
      })
      .forRoutes('search');
  }
}
