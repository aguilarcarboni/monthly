
export function getCallbackUrl(path: string) {
const segments = path.split('/');
    if (segments.length <= 2) {
        return null;
    }
    return '/' + segments.slice(2).join('/');
}