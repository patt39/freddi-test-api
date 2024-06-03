import { Injectable } from '@nestjs/common';
import { Prisma, Project } from '@prisma/client';
import { DatabaseService } from '../../app/database/database.service';
import {
  withPagination,
  WithPaginationResponse,
} from '../../app/utils/pagination/with-pagination';
import {
  CreateProjectsOptions,
  GetOneProjectSelections,
  GetProjectsSelections,
  UpdateProjectsOptions,
  UpdateProjectsSelections,
} from './projects.type';

@Injectable()
export class ProjectsService {
  constructor(private readonly client: DatabaseService) {}

  async findAll(
    selections: GetProjectsSelections,
  ): Promise<WithPaginationResponse | null> {
    const prismaWhere = {} as Prisma.ProjectWhereInput;
    const { search, pagination } = selections;

    if (search) {
      Object.assign(prismaWhere, {
        OR: [{ title: { contains: search, mode: 'insensitive' } }],
      });
    }

    const projects = await this.client.project.findMany({
      where: { ...prismaWhere, deletedAt: null },
      take: pagination.take,
      skip: pagination.skip,
      orderBy: pagination.orderBy,
    });

    const rowCount = await this.client.project.count({
      where: { ...prismaWhere, deletedAt: null },
    });

    return withPagination({
      pagination,
      rowCount,
      value: projects,
    });
  }

  // async findAll() {
  //   const projects = await this.client.project.findMany();

  //   return projects;
  // }

  async findOneBy(selections: GetOneProjectSelections) {
    const prismaWhere = {} as Prisma.ProjectWhereInput;

    const { projectId } = selections;

    if (projectId) {
      Object.assign(prismaWhere, { id: projectId });
    }

    const project = await this.client.project.findFirst({
      where: { ...prismaWhere, deletedAt: null },
    });

    return project;
  }

  async createOne(options: CreateProjectsOptions): Promise<Project> {
    const { title, description, image, status } = options;

    const project = this.client.project.create({
      data: {
        title,
        description,
        image,
        status,
      },
    });

    return project;
  }

  async updateOne(
    selections: UpdateProjectsSelections,
    options: UpdateProjectsOptions,
  ): Promise<Project> {
    const { projectId } = selections;
    const { deletedAt, title, description, image, status } = options;

    const project = this.client.project.update({
      where: { id: projectId },
      data: { deletedAt, title, description, image, status },
    });

    return project;
  }
}
