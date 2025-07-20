import * as vscode from 'vscode';
import { RegmonkeyOutlineProvider } from './OutlineProvider';

export function activate(context: vscode.ExtensionContext) {
  const provider = new RegmonkeyOutlineProvider();
  vscode.window.registerTreeDataProvider('RegmonkeyOutlineView', provider);

  context.subscriptions.push(
    vscode.commands.registerCommand('RegmonkeyOutline.revealLine', (line: number) => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const position = new vscode.Position(line, 0);
        editor.revealRange(new vscode.Range(position, position), vscode.TextEditorRevealType.AtTop);
      }
    })
  );
}

export function deactivate() {}
