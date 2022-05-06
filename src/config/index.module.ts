import { Module } from '@nestjs/common';
import { AppConfigModule } from './app/app.module';
import { MongoDbModule } from './database/index.module';

@Module({
  imports: [AppConfigModule, MongoDbModule],
})
export class ConfigRootModule {}
