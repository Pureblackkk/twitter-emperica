import React from "react";
import { IUserPostInfo, IBaseUserInfo } from "$/src/twitter-room/core/common";
import { formatDateFromNow } from '$/utils/time-format';

export function BaseAvatar(avatarImage: string) {
    if (avatarImage.indexOf('svg') > 0) {
        const base64data = btoa(unescape(encodeURIComponent(avatarImage)));
        return (
            <div className='w-48px h-48px'>
                <img className='rounded-3xl' src={`data:image/svg+xml;base64,${base64data}`}/>
            </div>  
        );
    } else return (
        <div className='w-48px h-48px'>
            <img className='rounded-3xl' src={avatarImage}/>
        </div>
    );
}

export function UserAvatarIntro(props: 
    Required<Omit<IBaseUserInfo, 'avatar'> 
    & Pick<IUserPostInfo, 'type' | 'time'>>
) {
    const { name, id, type, isVerified, time } = props;
    const lastTime = formatDateFromNow(time);
    return (
        <div className={`flex
            ${
                type === 'comment' ? 
                ('flex-row items-center gap-2') 
                : ('flex-col justify-around')
            }
        `}>
            <div className="">
                <span>{ name }</span>
                {/* TODO: Set verified icon here */}
            </div>
            <div className="text-14px text-twitter-dark">
                {`@${id}${type === 'comment' ? (` · ${lastTime ?? ''}`) : (``)}`}
            </div>
        </div>
    );
}

export function PostAvatar(props: IUserPostInfo) {
    const { avatar, ...rest } = props;
    return (
        <div className="flex flex-row items-center">
            { BaseAvatar(avatar) }
            <div className="pl-14px">
                <UserAvatarIntro {...rest}/>
            </div>
        </div>
    );
}