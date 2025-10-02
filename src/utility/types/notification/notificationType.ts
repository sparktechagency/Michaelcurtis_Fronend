// Sender type
export interface Sender {
    id: number;
    full_name: string;
    email: string;
    avatar: string | null;
    contact_number: string | null;
    address: string | null;
    status: string; // "active" | "inactive" etc.
    created_at: string;
    updated_at: string;
    joined_at: string;
    last_login_at: string;
    first_name: string;
}

// Notification type
export interface Notification {
    id: number;
    sender_id: number;
    body: string;
    notification_type: string;
    recipient_type: string; // "all" | "single" etc.
    status: string; // "sent" | "pending" | etc.
    created_at: string;
    created_at_human: string;
    updated_at: string;
    sender: Sender;
}
