import React, { useEffect, useRef } from 'react';
import {
    IStatus,
    IMessage,
    ContentType,
} from '$/chatroom/core/messages/content-manger-interface';

interface IContentPros{
    userId: string;
    contentList: (IStatus | IMessage)[];
}

export default function Content(props: IContentPros) {
    const { contentList, userId } = props;
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!bottomRef.current) return;
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [bottomRef.current, contentList]);

    return (
        <div className='
            h-300px flex flex-col
            pt-10px pb-10px pr-20px pl-20px
            bg-slate-900
            overflow-auto
        '>
            {
                contentList.map((content) => {
                    const key = `${content.userId}${content.timeStamp}`;
                    if (content.type === ContentType.STATUS) {
                        return (<StatusContent key={key} {...content}/>)
                    } else {
                        return (<MessageContent key={key} currentUserId={userId} {...content}/>)
                    }
                })
            }
            <div ref={bottomRef}></div>
        </div>
    );
}

/**
 * Render status content
 */
function StatusContent(props: IStatus) {
    const { type, userId, status } = props;
    return (
        <div>

        </div>
    );
}

/**
 * Render message content
 */
function MessageContent(props: IMessage & {currentUserId: string}) {
    const { userName, userId, currentUserId, message } = props;
    const isMyContent = userId === currentUserId;

    return (
        <div className={`
            mt-3px  mb-3px flex flex-col flex-none
            ${isMyContent ? 'items-end' : 'items-start'}  
        `}> 
            {/* User name */}
            <div className='
                text-slate-300 font-semibold
            '>
                { userName }
            </div>
            {/* Message content */}
            <div className={`
                text-slate-50 pr-6px pl-6px rounded-md inline-block
                max-w-3/5 text-left break-words
                ${isMyContent ? `
                    bg-slate-700
                ` : `
                    bg-slate-800
                `}
            `}>
                { message }
            </div>
        </div>
    );
}