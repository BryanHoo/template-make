"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_bailu_1 = require("@fruits-chain/react-bailu");
const antd_1 = require("antd");
const react_1 = require("react");
/** 列表搜索 */
const ListFilter = props => {
    const { submit, reset, form } = props;
    return (<antd_1.Form form={form}>
      <react_bailu_1.SearchFormLayout.Row>
        <react_bailu_1.SearchFormLayout.Col>
          <antd_1.Form.Item label="label" name="name">
            <antd_1.Input allowClear/>
          </antd_1.Form.Item>
        </react_bailu_1.SearchFormLayout.Col>
        <react_bailu_1.SearchFormLayout.Col>
          <antd_1.Form.Item>
            <react_bailu_1.SearchFormLayout.Space>
              <antd_1.Button type="primary" onClick={submit}>
                搜索
              </antd_1.Button>
              <antd_1.Button type="default" onClick={reset}>
                重置
              </antd_1.Button>
            </react_bailu_1.SearchFormLayout.Space>
          </antd_1.Form.Item>
        </react_bailu_1.SearchFormLayout.Col>
      </react_bailu_1.SearchFormLayout.Row>
    </antd_1.Form>);
};
exports.default = ListFilter;
//# sourceMappingURL=index.js.map