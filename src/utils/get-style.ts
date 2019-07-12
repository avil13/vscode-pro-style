import * as vscode from 'vscode';
import * as path from 'path';
import { readFileAsync } from './fs-async';

export const getStyles = async (context: vscode.ExtensionContext) => {
    const file = path.join(context.extensionPath, 'src/styles/fonts-styles.css');

    return await readFileAsync(file, 'utf-8');
};
