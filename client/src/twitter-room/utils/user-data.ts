import { 
    IBaseUserInfo, 
    IUserPostInfo,
    IPostContent,
    IPostReply,
    TwitterPostDevices,
} from '$/twitteroom/core/common';
import { generateRandomName, generateRandomAvatar } from '$/src/utils/random-generator';

export function generateUserPostInfo(
    currentPostInfo: IUserPostInfo,
    baseInfo: IBaseUserInfo, 
    content: IPostContent
): IUserPostInfo {
    const currentReplyTo = [
        {
            postKey: currentPostInfo.postKey,
            id: currentPostInfo.id,
        },
        ...currentPostInfo.replyTo
    ];
    const currentDate = new Date();

    return {
        ...baseInfo,
        content,
        type: 'comment',
        replyBy: [],
        replyTo: currentReplyTo,
        time: currentDate,
        device: TwitterPostDevices.ANDROID,
        shareAndLikeInfo: {
            reply: 0,
            retweet: 0,
            like: 0,
            quote: 0,
        },
        postKey: generateUserPostInfoKey(
            currentReplyTo,
            baseInfo.id,
            currentDate,
        ),
    };
}

export function generateUserBasicInfo(
    id: string
): IBaseUserInfo {
    return {
        id,
        name: generateRandomName(),
        avatar: generateRandomAvatar(),
        isVerified: false,
    };
}

export function generateUserPostInfoKey(replyTo: IPostReply[], selfId: string, date: Date) {
    return `${replyTo.map(({ id }) =>  id.charAt(0))}${selfId}${Number(date)}`;
}

export function postHandleRecievedMetaInfo(metaInfoMap: {[key: string]: IUserPostInfo}) {
    const handleDate = (dateString: string) => {
        return new Date(dateString);
    }

    for (let key in metaInfoMap) {
        const metaInfo = metaInfoMap[key];
        metaInfo.time = handleDate(metaInfo.time as unknown as string);
    }
}