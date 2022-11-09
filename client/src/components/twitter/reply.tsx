import React, { useContext } from "react";
import { TwitterContext } from '$/twitteroom/index';
import { BaseAvatar, UserAvatarIntro } from '$/components/twitter/avatar';
import { IUserPostInfo, IPostReply } from "$/src/twitter-room/core/common";
import { Content } from '$/components/twitter/cotent';
import { ReactComponent as ShareIcon } from '$/twitteroom/assets/svgs/share.svg';
import { ReactComponent as LikeIcon } from '$/twitteroom/assets/svgs/like.svg';
import { ReactComponent as RelyIcon } from '$/twitteroom/assets/svgs/reply.svg';
import { ReactComponent as RetweetIcon } from '$/twitteroom/assets/svgs/retweet.svg';
import { openTwitterInput } from '$/components/twitter/inputter';
import { TwitterActionType } from '$/twitteroom/core/reducer';

function ReplyingTo(replayTo: IPostReply[]) {
    if (replayTo.length === 0) return;
    const andOtherNum = replayTo.length - 1;
    return (
        <div>
            <span className="text-twitter-dark text-15px">Replying to </span>
            <span className="text-twitter-tag">
                <span>{`@${replayTo[0].id}`}</span>
                { andOtherNum > 2 ?
                    (<span>{`${andOtherNum}Others`}</span>)
                    : (andOtherNum === 1 && <span>{`@${replayTo[1].id}`}</span>)
                }
            </span>
        </div>
    );
}

function ReplyShareAndLikePanel(props: IUserPostInfo) {
    const { postKey, shareAndLikeInfo } = props;
    const { reply, retweet, like } = shareAndLikeInfo;
    const { selfBaseUserInfo, replyManger } = useContext(TwitterContext);
    const iconWrapperClassName = "flex flex-row justify-start items-center text-twitter-dark gap-2"
    const iconClassName = "w-21px h-50px fill-twitter-dark mg-r-20px";

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
            flex flex-row justify-start items-center gap-28
        " onClick={(e) => e.stopPropagation()}>
            <div className={`${iconWrapperClassName} hover:(
                text-twitter-reply
            )`} onClick={onReply}>
                <RelyIcon className={`${iconClassName} hover: (fill-twitter-reply)`}/>
                <span>{reply}</span>
            </div>
            <div className={`${iconWrapperClassName} hover:(
                text-twitter-retweet
            )`} onClick={onRetweet}>
                <RetweetIcon className={`${iconClassName} hover: (fill-twitter-retweet)`}/>
                <span>{ retweet }</span>
            </div>
            <div className={`${iconWrapperClassName} hover:(
                text-twitter-like
            )`} onClick={onLike}>
                <LikeIcon className={`${iconClassName} hover: (fill-twitter-like)`}/>
                <span>{ like }</span>
            </div>
            <div className={`${iconWrapperClassName} hover: (
                text-twitter-share
            )`}>
                <ShareIcon className={`${iconClassName} hover: (fill-twitter-share)`}/>
            </div>
        </div>
    );
}

export function Reply(props: IUserPostInfo) {
    const { replyBy } = props;
    const { replyManger } = useContext(TwitterContext);
    
    const handleReplyClick = (postKey: string) => {
        const newHead = replyManger.getUserPostInfoByKey(postKey);
        replyManger.head = newHead;
    }

    return (
        <div>
            {
                replyBy.map((reply, index) => {
                    const currentPostUserInfo = replyManger.getUserPostInfoByKey(reply.postKey);
                    if (currentPostUserInfo === undefined) return;
                    const { avatar, shareAndLikeInfo, replyTo, content, postKey, type, ...rest} = currentPostUserInfo;
                    return (
                        <div key={index} className={`
                            flex flex-row gap-3 border-t-1 border-twitter-border
                            pt-10px hover:cursor-pointer
                            ${((index === replyBy.length - 1) && 'border-b-1')}
                        `} onClick={() => handleReplyClick(postKey)}>
                            <div className="flex flex-col items-center flex-shrink-0 pl-2">
                                { BaseAvatar(avatar) }
                            </div>
                            <div className="flex flex-col">
                                <UserAvatarIntro type={type} {...rest}/>
                                { ReplyingTo(replyTo) }
                                <div>
                                   <Content type={type} {...content}/>
                                </div>
                                <ReplyShareAndLikePanel {...currentPostUserInfo}/>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}