import { USER_TYPE } from "src/app/shared/models/user-type.enum";

export interface UserDataModel {
    ok: boolean,
    data: {
        user: UserModel
    }
}

export interface UserModel {
    id: number;
    email: string;
    country: string;
    onboardingCompleted: boolean;
    role: string;
    type: USER_TYPE;
    username: string;
    profileImg?: string;
    description: string;
    contentTags: string[];
    networks: NetworkProfileModel[];
    birthDate?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface NetworkProfileModel {
    platform: string;
    name: string;
    profileImg?: string;
    url: string;
    integrated: boolean;
    integration?: BasicAnalyticsModel;
}

export interface BasicAnalyticsModel {
    analyticsYoutube: {
        totalSubs: number;
        totalVideos: number;
    }
}