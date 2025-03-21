export type Court = {
  id: number;
  name: string;
  is_active: boolean;
  created_at: string;
};

export type Booking = {
  id: number;
  court_id: number;
  user_id: string;
  start_time: string;
  end_time: string;
  is_public: boolean;
  created_at: string;
};

export type Tournament = {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  category: string;
  price: number;
  max_participants: number;
  requires_license: boolean;
  created_at: string;
};

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  license_number?: string;
  created_at: string;
};