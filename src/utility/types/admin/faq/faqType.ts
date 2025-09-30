export interface FaqData {
    question: string;
    answer: string
    is_active: string;
    updated_at: string;
    created_at: string;
    id: number
}

export interface FaqCreateApiResponseType {
    ok: true;
    message: string;
    data: FaqData
}

export interface FaqCreatePayloadType {
    question: string;
    answer: string;
};


export interface FaqDeleteApiResponseType {
    ok: boolean;
    message: string;
    data: string[];
};

export interface FaqDeleteApiPayloadType {
    id: number
};

export interface FaqUpdateApiPayloadType {
    id: number | number;
    question: string;
    answer: string;

};


export interface FaqUpdateApiResponseType {
    ok: boolean,
    message: boolean,
    data: string[]
}