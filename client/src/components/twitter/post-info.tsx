import React, { useContext } from "react";
import {
    TwitterPostDevices,
    IPostShareAndLikeInfo,
    IUserPostInfo,
} from '$/src/twitter-room/core/common';
import { formatDateTime, formatAMPM } from '$/src/utils/time-format';
import { ReactComponent as ShareIcon } from '$/twitteroom/assets/svgs/share.svg';
import { ReactComponent as LikeIcon } from '$/twitteroom/assets/svgs/like.svg';
import { ReactComponent as RelyIcon } from '$/twitteroom/assets/svgs/reply.svg';
import { ReactComponent as RetweetIcon } from '$/twitteroom/assets/svgs/retweet.svg';
import { TwitterContext } from '$/src/twitter-room/index';
import { openTwitterInput } from '$/src/components/twitter/inputter';
import { TwitterActionType } from '$/src/twitter-room/core/reducer';

function PostEdit(props: { time: Date, device: TwitterPostDevices }) {
    const { time, device } = props;
    const { day, month, year } = formatDateTime(time);
    const hour = formatAMPM(time);
    return (
        <div className="text-twitter-dark text-15px py-2">
            {`${hour} · ${month} ${day} · ${year} · Twitter for ${device}`} 
        </div>
    );
}

function PostShareAndLike(props: IPostShareAndLikeInfo) {
    const { retweet, quote, like } = props;
    return (
        <div className="
            flex flex-row justify-start py-2
            border-t-1 border-y-twitter-border
        ">
            <div className="mr-20px">
                <span className="text-twitter-light text-15px font-bold">{`${retweet}`}</span>
                <span className="text-twitter-dark text-14px"> Retweets</span>
            </div>
            <div className="mr-20px">
                <span className="text-twitter-light text-15px font-bold">{`${quote}`}</span>
                <span className="text-twitter-dark text-14px"> Quote Tweets</span>
            </div>
            <div>
                <span className="text-twitter-light text-15px font-bold">{`${like}`}</span>
                <span className="text-twitter-dark text-14px"> Likes</span>
            </div>
        </div>
    );
}

function PostShareAndLikeIncons(props: { postKey: string }) {
    const { postKey } = props;
    const iconClassName = (type: string) => `
        w-25px h-50px fill-twitter-dark hover:cursor-pointer hover:fill-twitter-${type}
    `
    const { replyManger, selfBaseUserInfo } = useContext(TwitterContext);

    const onRetweet = () => {
        replyManger.dispatch({
            type: TwitterActionType.RETWEET,
            payload: {
                currentPostKey: postKey,
            },
        });
    }

    const onLike = () => {
        replyManger.dispatch({
            type: TwitterActionType.LIKE,
            payload: {
                currentPostKey: postKey,
            },
        });
    }

    const onReply = () => {
        openTwitterInput(postKey, selfBaseUserInfo);
    }

    return (
        <div className="
            flex flex-row justify-around items-center
            border-t-1 border-y-twitter-border
        ">
            <RelyIcon onClick={onReply} className={iconClassName('reply')}/>
            <RetweetIcon onClick={onRetweet} className={iconClassName('retweet')}/>
            <LikeIcon onClick={onLike} className={iconClassName('like')}/>
            <ShareIcon className={iconClassName('share')}/>
        </div>
    );
}

export function PostInfo(props: IUserPostInfo) {
    const { time, shareAndLikeInfo, device, postKey } = props;

    return (
        <div>
            <PostEdit time={time} device={device} />
            <PostShareAndLike {...shareAndLikeInfo}/>
            <PostShareAndLikeIncons postKey={postKey}/>
        </div>
    );
}