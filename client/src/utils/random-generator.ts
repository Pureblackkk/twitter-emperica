import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import avatar from 'animal-avatar-generator';

const customConfig: Config = {
    dictionaries: [adjectives, colors, animals],
    separator: '-',
    length: 3,
    style: 'capital'
};

export function generateRandomName(): string {
    return uniqueNamesGenerator(customConfig); 
}

export function generateRandomAvatar(): string {
    return avatar(Math.random().toString(), { size: 200, round: true });
}