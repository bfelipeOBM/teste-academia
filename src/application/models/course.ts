import { Class } from "./class";

export type Course = {
  workload?: string;
  id?: number;
  name: string;
  description: string;
  image: string;
  video?: string;
  short_video?: string;
  specialty?: string;
  category?: string[];
  tags?: string[];
  upcoming_classes?: Class[];
  active?: boolean;
  status?: string;
  inserted_at?: string;
  updated_at?: string;
};
