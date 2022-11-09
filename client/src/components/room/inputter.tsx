import React, { useState } from 'react';
import { ContentType } from '$/chatroom/core/messages/content-manger-interface';
import { IContentManger } from '$/chatroom/core/messages/content-manger';


interface IInputterProps {
    userName: string;
    userId: string;
    dispatcher: IContentManger['push'];
}

export default function Inputter(props: IInputterProps) {
    const { userName, userId, dispatcher } = props;
    const [inputValue, setInputValue] = useState('');

    /**
     * Handle subit button click
     */
    const onSubmit = () => {
        if (inputValue.trim() === '') return;

        // Dispatch to content manager
        dispatcher({
            userName,
            userId,
            type: ContentType.MESSAGE,
            userAvatarIndex: 0, // TODO
            message: inputValue,
            timeStamp: Date.now().toString(),
        });
        
        // Clear input
        setInputValue('');
    }

    /**
     * Handle textarea enter key down
     */
    const onEnterKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onSubmit();
        }
    }

    /**
     * Handle textare input
     */
    const onInput = (event: React.ChangeEvent) => {
        setInputValue((event.target as  HTMLTextAreaElement).value);
    }

    return (
        <div 
            className='flex flex-row'
        >
            <textarea 
                placeholder='Please input' 
                onKeyDown={onEnterKeyDown}
                onChange={onInput}
                value={inputValue}
                className='
                    outline-none flex-initial resize-none
                    border-none focus:border-none focus:ring-0
                '
            >

            </textarea>
            <button 
                onClick={onSubmit}
                className='
                    text-l text-white font-550 flex-grow text-stroke-sm
                    bg-slate-500 hover:bg-slate-400 cursor-pointer rounded-br-3xl
                '
            > 
                Enter 
            </button>
        </div>
    );
}