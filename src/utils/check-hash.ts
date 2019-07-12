export const checkHash = (str: string): number => {
    let hash = 0;
    let i = 0;
    let char;
    str = str.replace('\n', '');

    if (str.length === 0) {
        return hash;
    }
    for (; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};
