// all user api 

export interface RoleList {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;

    pivot: {
        model_type: string;
        model_id: string;
        role_id: string
    }
}

export interface AllUserList {
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
    roles: RoleList
}

export interface AllUserApiResponse {
    data: AllUserList
}


export interface UserDeleteApiResponse {
    ok: boolean;
    message: string;
    data: string[]
}


export interface UserDeleteApiPayload {
    userId: number | undefined
}