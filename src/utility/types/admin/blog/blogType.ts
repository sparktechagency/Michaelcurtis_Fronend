

export interface Category {
    id: number,
    name: string;
    slug: string;
    description: string;

    logo_url: string;
    status: string;
    created_at: string;
    updated_at: string



}


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

}



export interface BlogApiResponseType {
    id: number;
    slute: string;
    title: string;
    author_name: string;
    content: string;
    featured_image: string;
    status: string;
    published_at: string;
    created_at: string;
    updated_at: string;
    policy_categories: Category;
    user: User
}