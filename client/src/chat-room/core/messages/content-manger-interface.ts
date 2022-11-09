export enum ContentType {
    MESSAGE = 'message',
    STATUS = 'status',
}

export interface IMessage {
    type: ContentType.MESSAGE;
    userId: string;
    userName: string;
    userAvatarIndex: number;
    message: string;
    timeStamp: string;
}

export interface IStatus {
    type: ContentType.STATUS;
    userId: string;
    userName: string;
    status: boolean;
    timeStamp: string;
}