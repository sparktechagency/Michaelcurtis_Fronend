export interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    pivot: {
        model_type: string;
        model_id: number;
        role_id: number;
    };
};

export interface User {
    id: number;
    full_name: string;
    email: string;
    main_role: string;
    avatar: string;
    contact_number: string;
    address: string;
    status: string;
    created_at: string;
    updated_at: string;
    joined_at: string;
    last_login_at: string;
    first_name: string;
    roles: Role[];
};


