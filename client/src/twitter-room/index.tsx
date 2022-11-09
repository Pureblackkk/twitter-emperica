import React, { useEffect, useMemo, useState } from 'react';
import { ReplyManger, UserPostMap } from '$/twitteroom/core/core';
import { IBaseUserInfo } from '$/twitteroom/core/common';
import { usePlayer, usePlayers, useRound } from "@empirica/core/player/classic/react";
import { generateUserBasicInfo } from '$/twitteroom/utils/user-data';
import { PostAvatar } from '$/components/twitter/avatar';
import { Content } from '$/components/twitter/cotent';
import { PostInfo } from '$/components/twitter/post-info';
import { Reply } from '$/components/twitter/reply';
import { Backup } from '$/components/twitter/backup';

export const TwitterContext = React.createContext<{
    replyManger: ReplyManger,
    selfBaseUserInfo: IBaseUserInfo,
}>(undefined);

export function Twitter() {
    const player = usePlayer();
    const players = usePlayers();
    const round = useRound();

    // Init replay manager
    const replyManger = ReplyManger.getInstance(round);

    // Generate self base user info
    const selfBaseUserInfo = useMemo(() => generateUserBasicInfo(player.id), []);

    // Update user post info map when round change
    replyManger.updateMetaInfoMap();

    // Set current head
    let [currentHead, setCurrentHead] = useState(replyManger.head);
    replyManger.registerSetHeadHook(setCurrentHead);
    // Overwrite current head
    currentHead = replyManger.head;

    return (
        <TwitterContext.Provider value={{
            replyManger,
            selfBaseUserInfo,
        }}>
            <div id='twitter-root' className='
                relative flex flex-col w-3/5 h-screen bg-black text-light-100 overflow-scroll
            '>
                <div id='twitter-inputter' className='absolute w-full h-full pointer-events-none'></div>
                <div className="flex flex-col gap-y-1 px-3 pt-1">
                    <Backup {...currentHead}/>
                    <PostAvatar {...currentHead}/>
                    <Content type={'post'} {...currentHead.content}/>
                    <PostInfo {...currentHead}/>
                </div>
                <Reply {...currentHead}/>
            </div>
        </TwitterContext.Provider>
    );
}
