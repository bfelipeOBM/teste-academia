export interface Course {
  upcoming_classes: any[],
  id: number,
  name: string,
  description: string,
  image: string,
  video: string,
  short_video: string,
  category: string[]
  active: boolean,
  specialty: string,
  inserted_at: string,
  updated_at: string
}