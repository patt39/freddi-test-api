import { Project } from '@prisma/client';
import { PaginationType } from '../../app/utils/pagination';

export type GetProjectsSelections = {
  search?: string;
  pagination?: PaginationType;
};

export type GetOneProjectSelections = {
  projectId: Project['id'];
};

export type UpdateProjectsSelections = {
  projectId: Project['id'];
};

export type CreateProjectsOptions = Partial<Project>;

export type UpdateProjectsOptions = Partial<Project>;
