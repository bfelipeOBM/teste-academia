export type CourseClass = {
  id: number;
  date: string;
  location: string;
};

export type Class = {
  studenst_count: number;
  class_id: number;
  id: number;
  course_id: number;
  date: string;
  location_id: number;
  location_name: string;
  max_students: number;
  inserted_at: string;
  updated_at: string;
  partner: string;
  sympla_url: string;
  name: string;
  description: string;
  image: string;
  video: string;
  short_video: string;
  category: string;
  active?: boolean;
  summary: string;
  specialty: string;
  workload: number;
  students_count: number;
  hasMaterials: boolean;
};
