import { USER_TYPE } from "src/app/shared/models/user-type.enum";
import { NetworkObjectModel } from "../../onboarding/models/onboarding.model";

export interface UserDataModel {
    username: string,
    profileImg?: string,
    country: string,
    contentTags: string[],
    description: string,
    networks?: NetworkProfileModel[];
    type: USER_TYPE
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