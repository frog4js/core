function getCurrentTimeMilliseconds() {
    const currentDate = new Date();
    return currentDate.getTime();
}

function getCurrentTimeSeconds() {
    const currentDate = new Date();
    return Math.floor(currentDate.getTime() / 1000);
}

export { getCurrentTimeSeconds, getCurrentTimeMilliseconds };
