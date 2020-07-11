import { Module } from '@gapi/core';
import { SharedModule } from '@shared/shared.module';

import { FrameworkImports } from '../framework-imports';
import { AppQueriesController } from './app.controller';
import { CoreModule } from './core/core.module';

@Module({
  imports: [FrameworkImports, CoreModule, SharedModule],
  controllers: [AppQueriesController],
})
export class AppModule {}
