// Policy type
type Policy = {
    id: number;
    name: string;
    slug: string;
    description: string;
    logo_url: string | null;
    status: string;
    created_at: string;
    updated_at: string;
};

// State type
type State = {
    id: number;
    name: string;
    code: string;
    created_at: string;
    updated_at: string;
};

// Provider type
export interface AllProviderType {
    id: number;
    name: string;
    slug: string;
    logo_url: string | null;
    pros: string[];
    cons: string[];
    price: string;
    is_sponsored: boolean;
    status: string;
    about: string;
    states_count: number | null;
    reviews_count: number;
    avg_overall_rating: string;
    avg_grade: string;
    formatted_overall_avg_score: string;
    avg_score: string | null;
    created_at: string;
    updated_at: string;

    states: State[];
};