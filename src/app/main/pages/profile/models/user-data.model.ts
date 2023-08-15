export interface UserDataModel {
    username: string,
    profileImg?: string,
    country: string,
    socialNetworks: string[],
    contentTags: string[],
    description: string,
    integratedNetworks: IntegratedNetworkModel[];
}

export interface IntegratedNetworkModel {
    network: string;
    channels: ChannelAnalyticModel[];
}

export interface ChannelAnalyticModel {
    name: string;
    totalSubs: number;
    totalVideos: number;
    totalViews: number;
}