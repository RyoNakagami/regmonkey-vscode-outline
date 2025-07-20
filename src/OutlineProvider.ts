import * as vscode from 'vscode';

export class OutlineItem extends vscode.TreeItem {
  children: OutlineItem[] = [];

  constructor(
    public readonly label: string,
    public readonly level: number,
    public readonly line: number,
  ) {
    super(label, vscode.TreeItemCollapsibleState.Collapsed);
    this.command = {
      command: 'RegmonkeyOutline.revealLine',
      title: '',
      arguments: [line]
    };
  }
}

export class RegmonkeyOutlineProvider implements vscode.TreeDataProvider<OutlineItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<OutlineItem | undefined> = new vscode.EventEmitter<OutlineItem | undefined>();
  readonly onDidChangeTreeData: vscode.Event<OutlineItem | undefined> = this._onDidChangeTreeData.event;

  private availableLangs: string[] = [];

  constructor() {
    this.loadConfig();

    vscode.window.onDidChangeActiveTextEditor(() => this.refresh());
    vscode.workspace.onDidChangeTextDocument(() => this.refresh());
    vscode.workspace.onDidChangeConfiguration(e => {
      if (e.affectsConfiguration('RegmonkeyOutline.availableLanguages')) {
        this.loadConfig();
        this.refresh();
      }
    });
  }

  private loadConfig() {
    const config = vscode.workspace.getConfiguration('RegmonkeyOutline');
    const langs = config.get<string>('availableLanguages', 'markdown, python, r');
    this.availableLangs = langs.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  }

  refresh(): void {
    this._onDidChangeTreeData.fire(undefined);
  }

  getTreeItem(item: OutlineItem): vscode.TreeItem {
    return item;
  }

  getChildren(element?: OutlineItem): Thenable<OutlineItem[]> {
    if (element) return Promise.resolve(element.children);

    const editor = vscode.window.activeTextEditor;
    if (!editor) return Promise.resolve([]);

    const lang = editor.document.languageId.toLowerCase();
    if (!this.availableLangs.includes(lang)) return Promise.resolve([]);

    const lines = editor.document.getText().split('\n');

    const items = this.parseHeadings(lines);
    return Promise.resolve(this.nestHeadings(items));
  }

  private parseHeadings(lines: string[]): OutlineItem[] {
    const items: OutlineItem[] = [];

    for (let i = 0; i < lines.length; i++) {
      const match = /^(#{2,6})\s+(.*)/.exec(lines[i]);
      if (match) {
        const level = match[1].length;
        items.push(new OutlineItem(match[2], level, i));
      }
    }

    return items;
  }

  private nestHeadings(flat: OutlineItem[]): OutlineItem[] {
    const root: OutlineItem[] = [];
    const stack: OutlineItem[] = [];

    for (const item of flat) {
      while (stack.length > 0 && item.level <= stack[stack.length - 1].level) {
        stack.pop();
      }

      if (stack.length === 0) {
        root.push(item);
      } else {
        stack[stack.length - 1].children.push(item);
      }

      stack.push(item);
    }

    return root;
  }
}
