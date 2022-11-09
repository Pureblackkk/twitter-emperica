import React, { useReducer } from 'react';
import { usePlayer, usePlayers, useRound } from "@empirica/core";
import Header from '$/components/room/header';
import Content from '$/components/room/content';
import Inputter from '$/components/room/inputter';
import { ContentManger } from '$/chatroom/core/messages/content-manger';

export function Room() {
    const player = usePlayer();
    const players = usePlayers();
    const round = useRound();

    // Get contentManger
    const customKey = 'chat-playground';
    const contentMangerInstance = ContentManger.getInstance(round, customKey);

    return (
        <div className='flex flex-col w-3/5'>
            <Header/>
            <Content 
                userId={player.id} 
                contentList={contentMangerInstance.getMessages()}
            />
            <Inputter
                userName={player.get('chat_name') as string}
                userId={player.id}
                dispatcher={contentMangerInstance.push.bind(contentMangerInstance)}
            />
        </div>
    );
}
