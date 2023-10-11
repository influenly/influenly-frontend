export interface OnboardingModel {
	description: string;
	birthDate?: string;
    networks?: NetworkObjectModel;
    username: string;
    contentTags: string[];
    networkIntegratedId?: number;
}

export interface NetworkObjectModel {
    youtube?: string[];
    tiktok?: string[];
    instagram?: string[];
    twitter?: string[];
    twitch?: string[];
    facebook?: string[];
    website?: string[];
}