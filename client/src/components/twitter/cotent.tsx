import React from 'react';
import { IPostContent, IUserPostInfo } from '$/src/twitter-room/core/common';

export function Content(props: IPostContent & Pick<IUserPostInfo, 'type'>) {
    const {
        textContent,
        imageContent,
        hashTagContents,
        type
    } = props;

    const textSize = type === 'post' ? 'text-23px' : 'text-15px';
    
    return (
        <div>
            <div className={`${textSize} py-2`}>
                { textContent }
            </div>
            <div>
                { ImageContent(imageContent) }
            </div>
            <div className={`${textSize}`}>
                { 
                    hashTagContents.map((content) => {
                        return HashTagContent(content);
                    })
                }
            </div>
        </div>
    );
}

export function ImageContent(imgURL: string) {
    return (
        <img src={imgURL}>   
        </img>
    );
}

export function HashTagContent(content: string) {
    if (!content) return;
    return (
        <span className="text-twitter-tag">
            {`#${content}`}
        </span>
    );
}

