import path = require("path");
import * as vscode from "vscode";
import { createTemplate, getTemplateUrl, pullTemplate } from "./command";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "template-make" is now active!');

  const templateUri = path.join(
    context.globalStorageUri.fsPath,
    ".vscode-template-make"
  );

  const saveTemplateUrl = vscode.commands.registerCommand(
    "template-make.saveTemplateUrl",
    () => getTemplateUrl(context)
  );

  const updateTemplate = vscode.commands.registerCommand(
    "template-make.updateTemplate",
    () => {
      const value: any = context.globalState.get("templateUrl");
      pullTemplate(value, templateUri);
    }
  );

  const createTemplateCommand = vscode.commands.registerCommand(
    "template-make.createTemplate",
    (uri) => createTemplate(uri, templateUri)
  );

  context.subscriptions.push(
    saveTemplateUrl,
    updateTemplate,
    createTemplateCommand
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
