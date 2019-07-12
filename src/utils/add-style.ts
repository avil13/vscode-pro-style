import * as vscode from 'vscode';
import { getEnv } from './env';
import { checkHash } from './check-hash';
import { readFileAsync, writeFileAsync } from './fs-async';

export const addStyle = async (context: vscode.ExtensionContext | null, styleCode: string) => {
    const env = getEnv(context);

    const htmlFile = env('htmlFile');

    let html = await readFileAsync(htmlFile, 'utf-8');

    const oldCodeRE = new RegExp(`${env('styleMarkStart')}[^]*?${env('styleMarkEnd')}`);
    const strStyleCodeBlock = styleCode ? env('styleMarkStart') + styleCode + env('styleMarkEnd') : '';

    if (isStringExists(html, strStyleCodeBlock, oldCodeRE)) {
        return;
    }

    html = html.replace(oldCodeRE, '');
    html = html.replace(/(<\/html>)/, strStyleCodeBlock + '</html>');

    await writeFileAsync(htmlFile, html, 'utf-8');
};


export const isStringExists = (src: string, strForChech: string, reg: RegExp): boolean => {
    const data = src.match(reg);

    if (data === null) {
        if (strForChech === '') {
            return true;
        }
        return false;
    }

    const subStr = data[0];

    return checkHash(subStr) === checkHash(strForChech);
};
