import { USER_TYPE } from "src/app/shared/models/user-type.enum";
import { NetworkObjectModel } from "../../onboarding/models/onboarding.model";

export interface UserDataModel {
    ok: boolean,
    user: UserModel
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
    basicAnalytics?: BasicAnalyticsModel;
}

export interface BasicAnalyticsModel {
    totalSubs: number;
    totalVideos: number;
}