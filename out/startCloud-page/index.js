"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_bailu_1 = require("@fruits-chain/react-bailu");
const react_1 = require("react");
const button_export_1 = require("@/components/_business/button-export");
// TODO: 修改 api 访问接口
const expense_payment_return_1 = require("@/graphql/operations/finance-center/expense-peach/__generated__/expense-payment-return");
const gql_1 = require("@/hooks/useTablePaging/gql");
const filter_1 = require("./components/filter");
const table_1 = require("./components/table");
const NewPage = () => {
    const { tableProps, form, submit, reset, refresh } = (0, gql_1.default)({
        // TODO: 修改 api 访问接口
        gql: expense_payment_return_1.PagePaymentReturnDocument,
        gqlKey: 'xxxPage',
        isSingleParams: true,
        defaultParams: {},
        paramsValueTypeMap: {},
        formatParams: v => v,
    });
    return (<div className="pageWrap">
      <react_bailu_1.Card.Group>
        <react_bailu_1.Card.Search>
          <filter_1.default form={form} submit={submit} reset={reset}/>
        </react_bailu_1.Card.Search>
        <react_bailu_1.Card.Table toolBar={<button_export_1.default text="导出" gql={expense_payment_return_1.ExportPaymentReturnDocument} gqlKey="exportPaymentReturn" params={{}}/>}>
          <table_1.default tableProps={tableProps} refresh={refresh}/>
        </react_bailu_1.Card.Table>
      </react_bailu_1.Card.Group>
    </div>);
};
exports.default = NewPage;
//# sourceMappingURL=index.js.map