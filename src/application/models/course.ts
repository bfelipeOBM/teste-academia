import { CourseClass } from "./class";

export type Course = {
  workload: number;
  id: number;
  name: string;
  summary: string;
  description: string;
  image: string;
  video?: string;
  short_video?: string;
  specialty?: string;
  category?: string[];
  tags?: string[];
  upcoming_classes?: CourseClass[];
  active?: boolean;
  status: string;
  inserted_at?: string;
  updated_at?: string;
  course_image?: string;
  course_id?: number;
  date?: string;
};

export type CourseLocation = {
  id: number;
  name: string;
};
