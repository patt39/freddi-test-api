import { Module } from '@nestjs/common';
import { DatabaseModule } from './app/database/database.module';
import { ProjectsModule } from './modules/projects/projects.module';

@Module({
  imports: [DatabaseModule, ProjectsModule],
})
export class AppModule {}
