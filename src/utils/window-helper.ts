import * as vscode from 'vscode';
import msg from './messages';

export function reloadWindow() {
    // reload vscode-window
    return vscode.commands.executeCommand('workbench.action.reloadWindow');
}

export function enabledRestart(messageTitle: string, messageString: string) {
    return vscode.window.showInformationMessage(messageString, { title: messageTitle }).then(() => {
        return reloadWindow();
    });
}
