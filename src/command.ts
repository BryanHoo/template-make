import * as vscode from "vscode";
import { copy, pathExists, readdir, remove } from "fs-extra";
import gitClone = require("git-clone/promise");
import path = require("path");

// 公用模板存储目录
const templateDir = (context: vscode.ExtensionContext) =>
  path.join(context.globalStorageUri.fsPath, ".vscode-template-make");

export const getTemplateUrl = (context: vscode.ExtensionContext) => {
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
      if (!value) return;
      context.globalState.update("templateUrl", value);
      vscode.window.showInformationMessage("远程仓库地址保存成功~");
    });
};

// 初始化公用模板
export const pullTemplate = async (value: string, templateUri: string) => {
  try {
    const exist = await pathExists(templateUri);
    if (exist) {
      await remove(templateUri);
    }
    await gitClone(value, templateUri);
    vscode.window.showInformationMessage("拉取模板仓库成功~");
  } catch (err) {
    vscode.window.showErrorMessage(String(err));
  }
};

export const createTemplate = async (uri: any, templateUri: string) => {
  try {
    let templatePaths = await readdir(templateUri);
    templatePaths = templatePaths.filter(
      (item) => !/(^|\/)\.[^/.]/g.test(item)
    );
    const templateName = await vscode.window.showQuickPick(templatePaths, {
      placeHolder: "选择一个模板",
    });
    if (!templateName) return;
    const srcPath = path.resolve(templateUri, templateName);
    const dstTemplateName = await vscode.window.showInputBox({
      prompt: "输入文件名称",
      value: templateName,
    });
    if (!dstTemplateName) return;
    let currentPath = uri.fsPath;
    if (!currentPath && vscode.workspace.workspaceFolders?.length) {
      currentPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    }
    if (!currentPath) return;
    const dstPath = path.resolve(currentPath, dstTemplateName);
    await copy(srcPath, dstPath);
    vscode.window.showInformationMessage("模板文件创建成功~");
  } catch (err) {
    vscode.window.showErrorMessage(String(err));
  }
};
