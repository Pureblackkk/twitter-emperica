import React, { useContext } from "react";
import { IUserPostInfo } from "$/src/twitter-room/core/common";
import { TwitterContext } from '$/twitteroom/index';
import { ReactComponent as BackIcon } from '$/twitteroom/assets/svgs/back.svg';

export function Backup(props: IUserPostInfo) {
    const { replyTo } = props;
    const { replyManger } = useContext(TwitterContext);

    const handleBackup = () => {
        if (replyTo.length === 0) return;
        const { postKey: parentKey } = replyTo[0];
        if (parentKey === undefined) return;
        
        // Set current post type to comment
        props.type = 'comment';
        
        // Back to parent post
        const parentUserPostInfo = replyManger.getUserPostInfoByKey(parentKey);
        replyManger.head = parentUserPostInfo;
    }

    return (
        <div className="flex flex-row justify-start items-center gap-9 h-12 pb-1">
            <BackIcon onClick={handleBackup} className="w-20px fill-twitter-light hover:cursor-pointer"/>
            <div className="text-20px font-bold"> Tweet </div>
        </div>
    );
}