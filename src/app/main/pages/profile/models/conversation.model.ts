export interface ConversationModel {
    id: number;
    creatorUserId: number;
    advertiserUserId: number;
    creatorUser: { id: number, profile: { username: string, profileImg: string } };
    advertiserUser: { id: number, profile: { username: string, profileImg: string } };
    status: CONVERSATION_STATUS;
    updatedAt: string;
}

export enum CONVERSATION_STATUS {
    APPROVAL_PENDING = "APPROVAL_PENDING",
    ACEPTED = "ACEPTED"
}