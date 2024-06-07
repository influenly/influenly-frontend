import { UserModel } from "../../profile/models/user-data.model";

export interface CampaignModel {
    id?: number;
    name: string;
    description: string;
    contentTags: string[];
    endDate: string;
    advertiserId?: number;
    status?: string;
    advertiser?: UserModel;
    remainingDays?: string;
}