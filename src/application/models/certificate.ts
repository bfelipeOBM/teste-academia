export type Certificate = {
  id?: number;
  course_id?: number;
  class_id?: number;
  enrollment_id?: number;
  name: string;
  image?: string;
  date: string;
  category: string[];
  location: string;
  certificate_url: string;
};
