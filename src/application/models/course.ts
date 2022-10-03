export type Course = {
  id?: number;
  name: string;
  description: string;
  image: string;
  video?: string;
  short_video?: string;
  specialty?: string;
  category?: string[];
  tags?: string[];
  upcoming_classes?: string;
  active?: boolean;
  status?: string;
  inserted_at?: string;
  updated_at?: string;
};
