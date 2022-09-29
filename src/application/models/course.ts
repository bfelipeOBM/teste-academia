export type Course = {
  id?: number;
  name: string;
  description: string;
  image: string;
  video?: string;
  specialty?: string;
  category?: string[];
  tags?: string[];
  nextClass?: string;
  active?: boolean;
  status?: string;
};
