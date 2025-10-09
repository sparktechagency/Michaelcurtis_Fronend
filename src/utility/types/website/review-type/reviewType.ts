// Review Score structure
export interface ReviewScores {
  claims: string;
  pricing: string;
  service: string;
  coverage: string;
  transparency_trust: string;
};

// User structure
export interface User {
  id: number;
  full_name: string;
  email: string;
  avatar: string;
  contact_number: string;
  address: string;
  status: string;
  created_at: string;
  updated_at: string;
  joined_at: string;
  last_login_at: string;
  first_name: string;
};


export interface Provider {
  id: number;
  name: string;
  slug: string;
  logo_url: string;
  pros: string[],
  cons: string[],
  price: string;
  is_sponsored: boolean;
  status: string;
  about: string;
  reviews_count: number;
  avg_overall_rating: string;
  avg_grade: string;
  formatted_overall_avg_score: string;
  avg_score: {
    claims: number;
    pricing: number;
    service: number;
    coverage: number;
    transparency_trust: number;
  },
  created_at: string;
  updated_at: string

}



// Main Review structure
export interface Review {
  id: number;
  user_id: number;
  provider_id: number;
  state_id: number;
  overall_rating: number;
  status: string;
  comment: string;
  scores: ReviewScores;
  display_score: string;
  created_at: string;
  created_at_human: string;
  updated_at: string;
  user: User;
  provider: Provider
};

export interface ReviewResponseType {
  id: number;
  user_id: number;
  provider_id: number;
  state_id: number;
  overall_rating: string;
  status: string;
  comment: string;
  scores: {
    trust: string;
    claims: string;
    pricing: string;
    service: string;
    coverage: string;
  };
  display_score: number;
  created_at: string;
  created_at_human: string;
  updated_at: string;
  user: {
    id: number;
    full_name: string;
    email: string;
    avatar: string;
    contact_number: string | null;
    address: string | null;
    status: string;
    created_at: string;
    updated_at: string;
    joined_at: string;
    last_login_at: string;
    first_name: string;
  };
  provider: {
    id: number;
    name: string;
    slug: string;
    logo_url: string;
    pros: string[];
    cons: string[];
    price: string;
    is_sponsored: boolean;
    status: string;
    about: string;
    reviews_count: number;
    avg_overall_rating: string;
    avg_grade: string;
    formatted_overall_avg_score: string;
    avg_score: {
      trust: number;
      claims: number;
      pricing: number;
      service: number;
      coverage: number;
    };
    created_at: string;
    updated_at: string;
  };
};



// Root Review Type
export interface ReviewWithVote {
  id: number;
  user_id: number;
  provider_id: number;
  state_id: number;
  comment: string;
  scores: Scores;
  overall_rating: string;
  status: string;
  submitted_at: string;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
  upvotes: number;
  downvotes: number;
  user: UserVote;
}

// Scores (Rating Criteria)
export interface Scores {
  trust: string;
  claims: string;
  pricing: string;
  service: string;
  coverage: string;
}

// User Info
export interface UserVote {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at: string | null;
  avatar: string;
  contact_number: string | null;
  address: string | null;
  status: string;
  joined_at: string;
  last_login_at: string;
  created_at: string;
  updated_at: string;
  full_name: string;
}
