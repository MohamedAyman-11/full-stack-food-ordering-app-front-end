export interface Category {
  id: string;
  name: string;
  image: {
    url: string;
    public_id: string;
  };
  created_at: Date;
  updated_at: Date;
}
