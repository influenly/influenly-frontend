export interface CampaignModel {
    id?: number;
    name: string;
    description: string;
    contentTags: string[];
    endDate: string;
    advertiserId?: number;
    status?: string;
}