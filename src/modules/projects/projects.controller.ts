import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { reply } from '../../app/utils/reply';

import {
  addPagination,
  RequestPaginationDto,
} from '../../app/utils/pagination';
import { CreateOrUpdateProjectDto } from './projects.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  /** Get all projects */
  @Get(`/`)
  async findAll(
    @Res() res,
    @Req() req,
    @Query() requestPaginationDto: RequestPaginationDto,
  ) {
    const { take, page, sort, sortBy, search } = requestPaginationDto;
    const pagination = addPagination({ page, take, sort, sortBy });

    const projects = await this.projectsService.findAll({
      pagination,
      search,
    });

    return reply({ res, results: projects });
  }

  /** Create projects */
  @Post(`/`)
  async createOne(@Res() res, @Body() body: CreateOrUpdateProjectDto) {
    const { title, description, status } = body;

    await this.projectsService.createOne({
      title,
      description,
      status,
    });

    return reply({ res, results: 'Project created' });
  }

  /** Delete one project */
  @Put(`/:projectId`)
  async updateOne(
    @Res() res,
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Body() body: CreateOrUpdateProjectDto,
  ) {
    const { title, description, status } = body;
    const findOneProject = await this.projectsService.findOneBy({
      projectId,
    });
    if (!findOneProject)
      throw new HttpException(
        `projectId: ${projectId} doesn't exists please change`,
        HttpStatus.NOT_FOUND,
      );

    await this.projectsService.updateOne(
      { projectId: findOneProject?.id },
      { title, description, status },
    );

    return reply({ res, results: 'Breed deleted successfully' });
  }

  /** Delete one project */
  @Delete(`/:projectId`)
  async deleteOne(
    @Res() res,
    @Param('projectId', ParseUUIDPipe) projectId: string,
  ) {
    const findOneProject = await this.projectsService.findOneBy({
      projectId,
    });
    if (!findOneProject)
      throw new HttpException(
        `projectId: ${projectId} doesn't exists please change`,
        HttpStatus.NOT_FOUND,
      );

    await this.projectsService.updateOne(
      { projectId: findOneProject?.id },
      { deletedAt: new Date() },
    );

    return reply({ res, results: 'Breed deleted successfully' });
  }
}
