
const base = 'http://dev.trainee.dex-it.ru/api/';

const request = async <T,O extends {body?:T,method:string}>(url: string, data:O, token: string | undefined) => {
    const headersForToken = token
        ? {
            Authorization: `Bearer ${token}`,
        } : { };
    const headerForMultiPart = typeof data.body === 'string' ? {
        'Content-Type': 'application/json;charset=utf-8',
    } : {};
    const response = await fetch(url, {
        ...data,
        // @ts-ignore
        headers: {
            ...headersForToken,
            ...headerForMultiPart,
        },
    });
    if (response?.ok) {
        if (response?.headers.get('Content-Length') === '0') {
            return true;
        }
        const typeResponse = response?.headers.get('Content-Type');
        let result;
        if (typeResponse === 'application/text') {
            result = await response?.text();
            return result;
        }
        result = await response?.json();
        return result;
    }

    throw { isCustomError: true, status: response?.status || 400 };
};

export const get = (url: string, token?: string) => request(`${base}${url}`, { method: 'GET' }, token);

export function post<T>(url: string, body: T, token?: string) {
    return request(`${base}${url}`, { method: 'POST', body }, token);
}

export const remove = (url: string, token: string) => request(`${base}${url}`, { method: 'DELETE' }, token);

export function put<T>(url: string, body: T, token: string) {
    return request(`${base}${url}`, { method: 'PUT', body }, token);
}