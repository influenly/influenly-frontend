export interface OnboardingModel {
	description: string;
	birthDate?: string;
    networks?: NetworkModel[];
    username: string;
    contentTags: string[];
    networkIntegratedId?: number;
    profileImg?: string;
}

export interface NetworkModel {
    platform: string;
    url: string;
}