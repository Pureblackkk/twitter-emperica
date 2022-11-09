import DefaultPostAvatar from '$/twitteroom/assets/imgs/default-post-avatar.jpeg';
import DefaultReplyAvatar from '$/twitteroom/assets/imgs/default-reply-avatar.jpeg';
import { generateUserPostInfoKey } from '$/twitteroom/utils/user-data';

export enum TwitterPostDevices {
    IPHONE = 'iPhone',
    ANDROID = 'Android',
}

export interface IPostShareAndLikeInfo {
    reply: number,
    retweet: number,
    like: number,
    quote: number,
}

export interface IPostContent {
    textContent: string;
    imageContent: string;
    hashTagContents: string[];
}

export interface IPostReply {
    id: string,
    postKey: string,
}

export interface IBaseUserInfo {
    name: string,
    id: string,
    avatar: string,
    isVerified: boolean,
}

export type IUserPostInfo = IBaseUserInfo & {
    postKey: string,
    type: 'post' | 'comment',
    content: IPostContent,
    time: Date,
    replyBy: IPostReply[],
    replyTo?: IPostReply[],
    device: TwitterPostDevices,
    shareAndLikeInfo: IPostShareAndLikeInfo,
}

const DefaultRootId = 'HKJC_Racing';
const DefaultRootDate = new Date('2020-05-19T03:24:00');
const DefaultRootUserKey = generateUserPostInfoKey(
    [],
    DefaultRootId,
    DefaultRootDate,
)

const DefaultRelpyId = 'jocfat'
const DefaultRelpyDate = new Date('2020-05-30T05:56:00')
const DefaultReplyUserKey = generateUserPostInfoKey(
    [{ id: DefaultRootId, postKey: DefaultRootUserKey}],
    DefaultRelpyId,
    DefaultRelpyDate,
)


export const DefaultRootUserPostInfo: IUserPostInfo = {
    postKey: DefaultRootUserKey,
    name: 'HKJC_Racing',
    id: 'HKJC_Racing',
    avatar: DefaultPostAvatar,
    isVerified: true,
    type: 'post',
    content: {
        hashTagContents: ['HKracing'],
        imageContent: '',
        textContent: `The 27-year-old will feature among Tuesday's trials at Sha Tin, taking mounts for Ricky Yiu and Chris So as he gets his first feel for Hong Kong racing`,
    },
    time: DefaultRootDate,
    replyBy: [
        { id: DefaultRelpyId, postKey: DefaultReplyUserKey },
    ],
    replyTo: [],
    device: TwitterPostDevices.IPHONE,
    shareAndLikeInfo: {
        retweet: 2,
        like: 10,
        quote: 1,
        reply: 0,
    },
}

const DefaultReplyUserPostInfo: IUserPostInfo = {
    postKey: DefaultReplyUserKey,
    name: 'Don',
    id: 'jocfat',
    avatar: DefaultReplyAvatar,
    isVerified: false,
    type: 'comment',
    content: {
        hashTagContents: [],
        imageContent: '',
        textContent: 'Populism and side shows, these guys have been part of sgr ever since. Not sure what they are smoking',
    },
    time: DefaultRelpyDate,
    replyBy: [],
    replyTo: [
        { id: DefaultRootId, postKey: DefaultRootUserKey },
    ],
    device: TwitterPostDevices.ANDROID,
    shareAndLikeInfo: {
        retweet: 0,
        like: 0,
        quote: 0,
        reply: 0,
    },
}

export const DefaultUserMap = {};
DefaultUserMap[DefaultRootUserKey] = DefaultRootUserPostInfo;
DefaultUserMap[DefaultReplyUserKey] = DefaultReplyUserPostInfo;