export interface Organization {
  id: string;
  name: string;
  email: string;
  location: string;
  created_at: string;
}

export interface Team {
  id: string;
  name: string;
  organization_id: string;
  created_at: string;
  organization?: Organization;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  team_id: string;
  image_url: string | null;
  created_at: string;
  team?: Team & {
    organization?: Organization;
  };
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  created_at: string;
}