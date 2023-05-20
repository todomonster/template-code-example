export function parseRootUrl(targetUrl) {
    const current = window.location.href.split('#/');
    const root = current?.[0];

    // targetUrl = '/login?forget=1&otp=${inputData.value.password}&mobile=${inputData.value.mobile}'
    return `${root}#${targetUrl}`;
}