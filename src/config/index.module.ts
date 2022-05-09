import { Module } from '@nestjs/common';
import { AppConfigModule } from './app/app.module';
import { ConfigCacheModule } from './cache/index.module';
import { MongoDbModule } from './database/index.module';

@Module({
  imports: [AppConfigModule, MongoDbModule, ConfigCacheModule],
})
export class ConfigRootModule {}
