// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { addStyle } from './utils/add-style';
import { getStyles } from './utils/get-style';
import { enabledRestart } from './utils/window-helper';
import msg from './utils/messages';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // console.log('Congratulations, your extension "vscode-pro-style" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const addingStyleCommand = vscode.commands.registerCommand('extension.proStyleAdd', () => {
        (async () => {
            try {
                const style = await getStyles(context);
                await addStyle(context, style);
                await enabledRestart(msg.title, msg.enabled);
            } catch (err) {
                vscode.window.showErrorMessage(`ProStyle error: ${err}`);
            }
        })();
    });

    const removeStyleCommand = vscode.commands.registerCommand('extension.proStyleRemove', async () => {
        try {
            await addStyle(context, '');
            await enabledRestart(msg.title, msg.disabled);
        } catch (err) {
            vscode.window.showErrorMessage(`ProStyle error: ${err}`);
        }
    });

    context.subscriptions.push(addingStyleCommand);
    context.subscriptions.push(removeStyleCommand);
}

// this method is called when your extension is deactivated
export function deactivate() {}
