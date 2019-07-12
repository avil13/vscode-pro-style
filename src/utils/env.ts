import * as vscode from 'vscode';
const path = require('path');



export function getEnv(context: vscode.ExtensionContext | null) {
    type keyEnvParams = keyof typeof params;

    const params = {
        isWin: /^win/.test(process.platform),

        get appDir() {
            return context ? context.extensionPath : '';
        },

        get base() {
            return this.appDir + (this.isWin ? '\\vs\\code' : '/vs/code');
        },

        get htmlFile() {
            return this.base + (this.isWin ? '\\electron-browser\\workbench\\workbench.html' : '/electron-browser/workbench/workbench.html');
        },

        get htmlFileBack() {
            return this.base + (this.isWin ? '\\electron-browser\\workbench\\workbench.html.bak-customcss' : '/electron-browser/workbench/workbench.bak-customcss');
        },

        styleMarkStart: '<!-- !! VSCODE-PRO-STYLE-START !! -->',
        styleMarkEnd: '<!-- !! VSCODE-PRO-STYLE-END !! -->',
    };

    const env = (key: keyEnvParams) => {
        return params[key];
    };

    return env;
}
