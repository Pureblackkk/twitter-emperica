import type { Round } from '@empirica/core';
import { postHandleRecievedMetaInfo } from '$/twitteroom/utils/user-data';
import { twitterReducer, TwitterAction } from '$/twitteroom/core/reducer';
import { IUserPostInfo, DefaultRootUserPostInfo, DefaultUserMap } from '$/twitteroom/core/common';

export interface IReplyManger {
    dispatch: (action: TwitterAction) => void;
}

export type UserPostMap = {[key: string]: IUserPostInfo};

export class ReplyManger {
    private static instance?: ReplyManger;

    public static getInstance(scope?: Round) {
        if (ReplyManger.instance) return ReplyManger.instance;
        ReplyManger.instance = new ReplyManger(scope);
        return ReplyManger.instance;
    }

    private scope: Round;
    private mapKey: string = 'replyMap';
    private currentHeadKey: string;
    private setHeadHook?: React.Dispatch<React.SetStateAction<IUserPostInfo>>;
    private userPostMap: UserPostMap;
    

    constructor(scope) {
        this.scope = scope;
        this.currentHeadKey = DefaultRootUserPostInfo.postKey;
        this.userPostMap = DefaultUserMap;
    }

    public dispatch(action: TwitterAction) {
        const isSuccess = twitterReducer(action, this.scope);
        if (!isSuccess) return;
        const currentTotalInfo = JSON.stringify(this.userPostMap);
        this.scope.set(this.mapKey, currentTotalInfo);
    }

    public getMetaInfo() {
        let metaInfo: UserPostMap;
        const json = this.scope.get(this.mapKey) as unknown as string;
        if (!json) {
            return undefined;
        } else {
            metaInfo = JSON.parse(json);
            postHandleRecievedMetaInfo(metaInfo);
        }
        return metaInfo as UserPostMap;
    }

    public getUserPostInfoByKey(key: string) {
        if (key in this.userPostMap) return this.userPostMap[key];
        return undefined;
    }

    public setUserPostInfoByKey(key: string, info: IUserPostInfo) {
        this.userPostMap[key] = info;
    }

    public registerSetHeadHook(hook: React.Dispatch<React.SetStateAction<IUserPostInfo>>) {
        this.setHeadHook = hook;
    }

    public updateMetaInfoMap() {
        const newMap = this.getMetaInfo();
        if (!newMap) return;
        this.userPostMap = newMap;
    }

    public set head(val: IUserPostInfo) {
        const { postKey } = val;
        this.currentHeadKey = postKey;
        const newHeadUserInfo = this.getUserPostInfoByKey(postKey);

        this.setHeadHook(newHeadUserInfo);
    }

    public get head() {
        const headUserInfo = this.getUserPostInfoByKey(this.currentHeadKey);
        return headUserInfo;
    }
}