export declare type AvatarOptions = {
    size?: number;
    avatarColors?: string[];
    backgroundColors?: string[];
    blackout?: boolean;
    round?: boolean;
};
declare const avatar: (seed: string, { size, avatarColors, backgroundColors, blackout, round, }?: AvatarOptions) => string;
export default avatar;
