"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const path = require("path");
const vscode = require("vscode");
const command_1 = require("./command");
function activate(context) {
    console.log('Congratulations, your extension "template-make" is now active!');
    const templateUri = path.join(context.globalStorageUri.fsPath, ".vscode-template-make");
    const saveTemplateUrl = vscode.commands.registerCommand("template-make.saveTemplateUrl", () => (0, command_1.getTemplateUrl)(context));
    const updateTemplate = vscode.commands.registerCommand("template-make.updateTemplate", () => {
        const value = context.globalState.get("templateUrl");
        (0, command_1.pullTemplate)(value, templateUri);
    });
    const createTemplateCommand = vscode.commands.registerCommand("template-make.createTemplate", (uri) => (0, command_1.createTemplate)(uri, templateUri));
    context.subscriptions.push(saveTemplateUrl, updateTemplate, createTemplateCommand);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map