export interface ConversationModel {
    id: number;
    creatorUserId: number;
    advertiserUserId: number;
    creatorUser: { id: number, username: string, profileImg: string };
    advertiserUser: { id: number, username: string, profileImg: string };
    status: CONVERSATION_STATUS;
    updatedAt: string;
}

export enum CONVERSATION_STATUS {
    INIT_APPROVAL_PENDING = "INIT_APPROVAL_PENDING",
    ACTIVE = "ACTIVE",
    FINISH_APPROVAL_PENDING = 'FINISH_APPROVAL_PENDING',
    FINISHED = 'FINISHED'
}