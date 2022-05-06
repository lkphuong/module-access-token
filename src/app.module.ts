import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigRootModule } from './config/index.module';
import { IndexModule } from './modules/index.module';

@Module({
  imports: [ConfigRootModule, AuthModule, IndexModule],
})
export class AppModule {}
