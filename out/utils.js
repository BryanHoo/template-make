"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkingPathDir = void 0;
const fs_extra_1 = require("fs-extra");
const path = require("path");
function getWorkingPathDir(context, activeTextEditor, workspace) {
    if (context) {
        const { fsPath } = context;
        const stats = fs_extra_1.default.statSync(context.fsPath);
        return stats.isDirectory() ? fsPath : path.dirname(fsPath);
    }
    else if (activeTextEditor) {
        return path.dirname(activeTextEditor.document.fileName);
    }
    else {
        return workspace.rootPath;
    }
}
exports.getWorkingPathDir = getWorkingPathDir;
//# sourceMappingURL=utils.js.map