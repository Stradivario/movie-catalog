import { Module } from '@gapi/core';
import { SharedModule } from '@shared/shared.module';

import { FrameworkImports } from '../framework-imports';
import { AppQueriesController } from './app.controller';
import { ClientPlugin } from './client/client.plugin';
import { CoreModule } from './core/core.module';

@Module({
  imports: [FrameworkImports, CoreModule, SharedModule],
  controllers: [AppQueriesController],
  plugins: [ClientPlugin],
})
export class AppModule {}
