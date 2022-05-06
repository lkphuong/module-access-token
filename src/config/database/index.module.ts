import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_CONNECTION, {
      dbName: process.env.MONGO_DB_NAME,
    }),
  ],
})
export class MongoDbModule {}
