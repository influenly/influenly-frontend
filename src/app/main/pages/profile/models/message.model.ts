export interface MessageModel {
    id: number;
    content: string;
    type: string;
    senderUserId: number;
    isReceived?: boolean;
}