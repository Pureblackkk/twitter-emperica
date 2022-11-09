import { 
    IUserPostInfo,
    IBaseUserInfo,
    IPostContent,
} from '$/twitteroom/core/common';
import { generateUserPostInfo } from '$/twitteroom/utils/user-data';
import { ReplyManger } from '$/twitteroom/core/core';
import type { Round } from '@empirica/core';

export enum TwitterActionType {
    LIKE,
    REPLY,
    RETWEET,
    QUOTE,
}

interface TwitterLikeAction {
    type: TwitterActionType.LIKE;
    payload: {
        currentPostKey: string,
    };
}

interface TwitterRetweetAction {
    type: TwitterActionType.RETWEET;
    payload: {
        currentPostKey: string,
    };
}

interface TwitterQuoteAction {
    type: TwitterActionType.QUOTE;
    payload: {
        currentPostKey: string,
    };
}

interface TwitterReplyAction {
    type: TwitterActionType.REPLY;
    payload: {
        currentPostKey: string,
        selfInfo: IBaseUserInfo,
        content: IPostContent,
    };
}

export type TwitterAction = TwitterLikeAction | TwitterReplyAction | TwitterRetweetAction | TwitterQuoteAction;

export function twitterReducer (action: TwitterAction, scope: Round) {
    const { type, payload } = action;
    const replyMangerInstance = ReplyManger.getInstance(scope);

    switch(type) {
        case TwitterActionType.LIKE: {
            // Update like number
            const { currentPostKey } = payload;
            replyMangerInstance.getUserPostInfoByKey(currentPostKey)
            .shareAndLikeInfo.like += 1;
            return true;
        }
        case TwitterActionType.REPLY: {
            // Update reply content
            const { currentPostKey, selfInfo, content } = payload;
            const currentPost = replyMangerInstance.getUserPostInfoByKey(currentPostKey);
            const newPostInfo = generateUserPostInfo(
                currentPost,
                selfInfo,
                content,
            );
            // Add reply to map
            replyMangerInstance.setUserPostInfoByKey(newPostInfo.postKey, newPostInfo);

            // Add self key and id to reply list
            currentPost.shareAndLikeInfo.reply += 1;
            currentPost.replyBy.push({ id: newPostInfo.id, postKey: newPostInfo.postKey });
            return true;
        }
        case TwitterActionType.RETWEET: {
            // Update retweet number
            const { currentPostKey } = payload;
            const currentPost = replyMangerInstance.getUserPostInfoByKey(currentPostKey);
            currentPost.shareAndLikeInfo.retweet += 1;
            return true;
        }
        case TwitterActionType.QUOTE: {
            // Update quote number
            const { currentPostKey } = payload;
            const currentPost = replyMangerInstance.getUserPostInfoByKey(currentPostKey);
            currentPost.shareAndLikeInfo.quote += 1;
            return true;
        }
        default:
            return false;
    }
}