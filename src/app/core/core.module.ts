import { Module } from '@rxdi/core';

import { DatabaseService } from './database/database.service';

@Module({
  providers: [DatabaseService],
})
export class CoreModule {}
