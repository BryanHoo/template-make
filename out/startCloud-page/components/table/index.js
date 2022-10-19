"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_bailu_1 = require("@fruits-chain/react-bailu");
const react_1 = require("react");
const ListTable = props => {
    const { tableProps } = props;
    const columns = [
        { title: 'title', dataIndex: 'name' },
        {
            title: '操作',
            dataIndex: 'action',
            render: (value, row) => {
                return null;
            },
        },
    ];
    return <react_bailu_1.Table {...tableProps} columns={columns} bordered showEmpty rowKey="id"/>;
};
exports.default = ListTable;
//# sourceMappingURL=index.js.map