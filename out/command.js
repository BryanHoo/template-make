"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTemplate = exports.pullTemplate = exports.getTemplateUrl = void 0;
const vscode = require("vscode");
const fs_extra_1 = require("fs-extra");
const gitClone = require("git-clone/promise");
const path = require("path");
const getTemplateUrl = (context) => {
    vscode.window
        .showInputBox({
        placeHolder: "输入远程仓库 Git Https 链接",
        prompt: "确定",
        validateInput(value) {
            const isGit = /^http(s)?:\/\/([^\/]+?\/){2}.*?.git$/.test(value);
            if (!isGit) {
                return {
                    message: "请输入正确的链接",
                    severity: vscode.InputBoxValidationSeverity.Error,
                };
            }
        },
    })
        .then((value) => {
        if (!value)
            return;
        context.globalState.update("templateUrl", value);
        vscode.window.showInformationMessage("远程仓库地址保存成功~");
    });
};
exports.getTemplateUrl = getTemplateUrl;
// 初始化公用模板
const pullTemplate = async (value, templateUri) => {
    try {
        const exist = await (0, fs_extra_1.pathExists)(templateUri);
        if (exist) {
            await (0, fs_extra_1.remove)(templateUri);
        }
        await gitClone(value, templateUri);
        vscode.window.showInformationMessage("拉取模板仓库成功~");
    }
    catch (err) {
        vscode.window.showErrorMessage(String(err));
    }
};
exports.pullTemplate = pullTemplate;
const createTemplate = async (uri, templateUri) => {
    try {
        let templatePaths = await (0, fs_extra_1.readdir)(templateUri);
        templatePaths = templatePaths.filter((item) => !/(^|\/)\.[^/.]/g.test(item));
        const templateName = await vscode.window.showQuickPick(templatePaths, {
            placeHolder: "选择一个模板",
        });
        if (!templateName)
            return;
        const srcPath = path.resolve(templateUri, templateName);
        const dstTemplateName = await vscode.window.showInputBox({
            prompt: "输入文件名称",
            value: templateName,
        });
        if (!dstTemplateName)
            return;
        let currentPath = uri.fsPath;
        if (!currentPath && vscode.workspace.workspaceFolders?.length) {
            currentPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
        }
        if (!currentPath)
            return;
        const dstPath = path.resolve(currentPath, dstTemplateName);
        await (0, fs_extra_1.copy)(srcPath, dstPath);
        vscode.window.showInformationMessage("模板文件创建成功~");
    }
    catch (err) {
        vscode.window.showErrorMessage(String(err));
    }
};
exports.createTemplate = createTemplate;
//# sourceMappingURL=command.js.map