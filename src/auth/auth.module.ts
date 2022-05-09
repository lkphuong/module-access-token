import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AccountModule } from 'src/modules/account/account.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from 'src/common/guards/jwt_auth.guard';
import { ConfigRootModule } from 'src/config/index.module';
import { CaslModule } from 'src/ability/ability.module';
@Module({
  imports: [
    AccountModule,
    PassportModule,
    ConfigRootModule,
    CaslModule,
    CacheModule.register({
      ttl: 300, // seconds
      max: 1000, // maximum number of items in cache
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
