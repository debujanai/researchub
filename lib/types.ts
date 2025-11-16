export type Article = {
  id: string;
  slug?: string;
  title: string;
  description: string;
  content: string;
  author: string;
  published_date: string;
  tags: string[];
  category: string;
  created_at: string;
  updated_at: string;
  uploaded_by: string;
};

export type AdminUser = {
  id: string;
  email: string;
  created_at: string;
};