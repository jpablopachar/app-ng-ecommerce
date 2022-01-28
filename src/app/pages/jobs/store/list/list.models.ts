import { Job as DBJob } from '@app/models/server/job';

export interface Job extends DBJob {
  id: string;
}

export type JobCreateRequest = DBJob;