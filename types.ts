export type Task = {
  id: string;
  agent: string | null;
  input: string;
  result: string | null;
  status: string;
  created_at: string;
};

export type AppUser = {
  name: string;
  email: string;
  avatar: string | null;
};
