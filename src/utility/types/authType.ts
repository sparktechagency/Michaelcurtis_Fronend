

// registration api 

export interface RegistrationApiPayload {
    first_name: string | undefined;
    last_name: string | undefined;
    email: string | number;
    password: string | undefined;
    password_confirmation: string | undefined;
}

export interface RegistrationApiResponse {
    ok: boolean;
    message: string;
    data: string[];
}



// OtpVerify api 

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at: string;
    avatar: string;
    contact_number?: string;
    status: string;
    joined_at?: string;
    last_login_at?: string;
    created_at: string;
    updated_at: string;
    full_name: string;
}


export interface UserData {
    access_token: string;
    token_type: string;
    user: User,
    last_name: string
}

export interface OtpVerifyApiResponse {
    ok: boolean;
    message: string;
    data: UserData
}


export interface OtpVerifyApiPayload {
    email: string | null;
    otp: number
}




// forget password api 

export interface EmailVerifyApiPayload {
    email: string | undefined
}


export interface EmailVerifyApiResponse {
    ok: boolean;
    message: string;
    data: string[]
}


// otp verify api 

export interface OtpVeriryApiPayload {
    email: string | null;
    otp: number | undefined
}

export interface UserToken {
    reset_token?: string;
}

export interface ForgetOtpVerifyApiResponse {
    ok: boolean;
    message: string;
    data: UserToken | null;
}

// {
//     "ok": true,
//     "message": "Password has been successfully reset.",
//     "data": []
// }


export interface NewPasswordSetApiRespone {
    ok: boolean;
    message: string;
    data: string[]
}




export interface NewPasswordSetApiPayload {
    email: string | undefined;
    reset_token: string | undefined;
    password: string | undefined;
    password_confirmation: string | undefined
}






// login api 


export interface LoginApiPayload {
    email: string | undefined;
    password: string | undefined
}





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
}

export interface Permission {
    // currently empty array in response, but we can still type it
    id?: number;
    name?: string;
    guard_name?: string;
    created_at?: string;
    updated_at?: string;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at: string;
    avatar: string;
    contact_number?: string;
    status: string;
    joined_at?: string;
    last_login_at?: string;
    created_at: string;
    updated_at: string;
    full_name: string;
    roles: Role[];
    permissions: Permission[];
}

export interface LoginApiResponse {
    ok: boolean;
    message: string;
    data: {
        access_token: string;
        token_type: string;
        user: User;
    };
}



// user or admin profile api 


export interface UserRole {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    pivot: {
        model_type: string;
        model_id: number;
        role_id: string

    }
}


export interface UserData {
    id: number;
    avatar: string;
    full_name: string;
    email: string;
    main_role?: string;
    contact_number: string;
    address: string;
    status: string;
    created_at: string;
    updated_at: string;
    joined_at: string;
    last_login_at: string;
    first_name: string;
    roles: UserRole;

}


export interface ProfileApiResponse {
    data: UserData | undefined
}


// profile update api 

export interface UserProfileData {
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
}

export interface ProfileUpdateApiResponse {

    data: UserProfileData


}


export interface ProfileUpdatePayload {
    first_name: string;
    address: string; // যদি API optional, তবে empty string set করতে পারো
    contact_number: string;
    email: string;
    avatar?: File;
}


export interface ProfileUpdate {

    ProfileUpdatePayload: FormData
}