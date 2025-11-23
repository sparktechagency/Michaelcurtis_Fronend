// ✅ Policy Type
export interface Policy {
    id: number;
    name: string;
    slug: string;
    description: string;
    logo_url: string | null;
    status: string;
    created_at: string;
    updated_at: string;
}

// ✅ State Type
export interface State {
    id: number;
    name: string;
    code: string;
    created_at: string;
    updated_at: string;
}

// ✅ Main Provider Type
export interface InsuranceProvider {
    title: string;
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
    states_count: number;
    reviews_count: number;
    avg_overall_rating: string;
    avg_grade: string;
    formatted_overall_avg_score: string;
    avg_score: string | null;
    created_at: string;
    updated_at: string;
    policies: Policy[];
    states: State[];
    sponsored_url: string
}



export interface StateType {
    id: number;
    name: string;
    code: string;
    created_at: string;
    updated_at: string

}


export interface InsuranceNameType {
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
    avg_score: string;
    created_at: string;
    updated_at: string
}

export interface TopInsuranceType {
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
    avg_trust: number,
    avg_claims: number,
    avg_pricing: number,
    avg_service: number,
    avg_coverage: number,
    states_count: number;
    sponsored_url: string;
}