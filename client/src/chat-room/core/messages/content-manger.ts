import {
    IMessage,
    IStatus,
} from '$/chatroom/core/messages/content-manger-interface';
import { Round } from '@empirica/core';

export interface IContentManger {
    getMessages: () => (IMessage | IStatus)[];
    push: (value: IMessage | IStatus) => void;
}

export class ContentManger implements IContentManger {
    private static instance?: ContentManger;

    public static getInstance(scope: Round, customKey: string) {
        if (ContentManger.instance) return ContentManger.instance;
        ContentManger.instance = new ContentManger(scope, customKey);
        return ContentManger.instance;
    }

    private scope: Round;
    private customKey: string;
    constructor(scope, customKey) {
        this.scope = scope;
        this.customKey = customKey;
    }

    getMessages() {
        let messages: (IMessage | IStatus)[]
        const json = this.scope.get(this.customKey) as unknown as string;
        if (!json) {
            return [];
        } else {
            messages = JSON.parse(json).messages;
        }
        return messages as (IMessage | IStatus)[];
    }

    push(value: IMessage | IStatus) {
        const currentMessages = this.getMessages();
        currentMessages.push(value);
        const currentMessagesJson = JSON.stringify({ messages: currentMessages });
        this.scope.set(this.customKey, currentMessagesJson);
    }
}