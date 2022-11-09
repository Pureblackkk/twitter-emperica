import React, { useState } from "react";
import * as ReactDOM from 'react-dom';
import { IUserPostInfo, IBaseUserInfo } from '$/twitteroom/core/common';
import { BaseAvatar, UserAvatarIntro } from '$/components/twitter/avatar';
import { Content } from '$/components/twitter/cotent';
import { TwitterActionType } from '$/src/twitter-room/core/reducer';
import { ReplyManger } from '$/twitteroom/core/core';

export function TwitterInputterEdit(props: {
    inputValue: string,
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
}) {
    const { inputValue, setInputValue } = props;

    /**
     * Handle textare input
     */
    const onInput = (event: React.ChangeEvent) => {
        setInputValue((event.target as  HTMLTextAreaElement).value);
    }

    return <div>
        <textarea 
                placeholder='Twitter your reply' 
                onChange={onInput}
                value={inputValue}
                className='
                    outline-none flex-initial resize-none w-full
                    bg-dark-600 border-none focus:border-none focus:ring-0
                '
        >
        </textarea>
    </div>
}

export function TwitterInputter(props: {selfInfo: IBaseUserInfo, postInfo: IUserPostInfo}) {
    const { selfInfo, postInfo } = props; 
    const { avatar, content, postKey, type, ...rest } = postInfo;
    const { avatar: selfAvatar } = selfInfo;

    const [inputValue, setInputValue] = useState('');
    const replyManger = ReplyManger.getInstance();
    const currentInputter = document.getElementById('twitter-inputter');

    const closeInputter = () => {
        // Close panel
        ReactDOM.render(null, currentInputter);
        currentInputter.style.pointerEvents = 'none';
    }

    const handleReply = () => {
        // Dispatch reply
        replyManger.dispatch({
            type: TwitterActionType.REPLY,
            payload: {
                currentPostKey: postKey,
                selfInfo: selfInfo,
                content: {
                    hashTagContents: [''],
                    textContent: inputValue,
                    imageContent: '',
                },
            },
        });

        // Close inputter panel
        closeInputter();
    }

    return (
        <div className="flex flex-col items-center absolute w-full h-full">
            <div onClick={closeInputter} className="w-full h-full bg-twitter-dark opacity-50 absolute"></div>
            <div className="relative bg-dark-600 w-4/5
                flex flex-col rounded-2xl py-2 my-12
            ">
                <div>
                    {/* Close header */}
                </div>
                <div className="flex flex-row gap-3">
                    <div className="flex flex-col items-center flex-shrink-0 pl-2">
                        { BaseAvatar(avatar) }
                    </div>
                    <div className="flex flex-col">
                        <div>
                            <UserAvatarIntro type={type} {...rest}/>
                            <div>
                                <Content type={'comment'} {...content}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-3 pr-1 pt-1">
                    <div className="flex flex-col items-center flex-shrink-0 pl-2">
                        { BaseAvatar(selfAvatar) }
                    </div>
                    <div className="flex flex-col flex-1">
                        <TwitterInputterEdit inputValue={inputValue} setInputValue={setInputValue}/>
                    </div>
                </div>
                <div className="text-twitter-light font-bold flex flex-row justify-end pr-4">
                    <button onClick={handleReply} className="w-70px h-30px bg-twitter-tag rounded-3xl">Reply</button>
                </div>
           </div>
        </div>
    );
};

export const openTwitterInput = (postKey: string, selfInfo: IBaseUserInfo) => {
    const target = document.getElementById('twitter-inputter');
    target.style.pointerEvents = 'auto';
    const userPostInfo = ReplyManger.getInstance().getUserPostInfoByKey(postKey);
    ReactDOM.render(<TwitterInputter postInfo={userPostInfo} selfInfo={selfInfo}/>, target);
}