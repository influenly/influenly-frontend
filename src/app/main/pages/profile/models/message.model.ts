export interface MessageModel {
    id: number;
    content: string;
    type: MESSAGE_TYPE;
    receiverUserId?: number;
    senderUserId?: number;
    isReceived?: boolean;
}

export enum MESSAGE_TYPE {
    REGULAR = 'REGULAR',
    INITIALIZER = 'INITIALIZER',
    FINISHER_APPROVAL_PENDING = 'FINISHER_APPROVAL_PENDING',
    FINISHER_APPROVED = 'FINISHER_APPROVED',
    FINISHER_REJECTED = 'FINISHER_REJECTED'
}