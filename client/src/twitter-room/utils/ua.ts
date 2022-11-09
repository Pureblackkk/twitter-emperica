import { TwitterPostDevices } from '$/twitteroom/core/common';

export function getDevice() {
    // Currently use a random devices to mock
    return ((Math.random() * 10) % 2 === 1) ? TwitterPostDevices.ANDROID : TwitterPostDevices.IPHONE;
}
