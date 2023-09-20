import { USER_TYPE } from "src/app/shared/models/user-type.enum";

export interface UserDataModel {
    username: string,
    profileImg?: string,
    country: string,
    socialNetworks: string[],
    contentTags: string[],
    description: string,
    integratedNetworks?: IntegratedNetworkModel[];
    type: USER_TYPE
}

export interface IntegratedNetworkModel {
    network: string;
    channels: ChannelAnalyticModel[];
}

export interface ChannelAnalyticModel {
    channelName: string;
    channelImg?: string;
    link?: string;
    verified: boolean;
    totalSubs: number;
    totalVideos: number;
    totalViews: number;
}