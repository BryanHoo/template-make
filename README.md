# Template Make 通用模板和代码片段

## 主要功能

- 代码片段生成
- 远程代码模板生成

## 迭代计划

- [ ] 支持更多代码片段
- [ ] 代码模板支持 `ejs`
- [ ] 通过 `AST` 语法树写入配置代码

## 模板文件食用指南

### 远程模板仓库规范

1. 插件读取远程仓库一级目录文件夹作为模板，一个文件夹就是一个模板
2. 建议命令 `项目名-模板名`

### 连接并使用

3. 通过 VsCode 安装本插件
4. 打开 VsCode 命令面板（Mac 快捷键 `Cmd+Shift+P`、Windows 快捷键 `Ctrl+Shift+P`，或通用快捷键 `F1`）
5. 命令面板内输入 `saveTemplateUrl`，按照提示添加远程模板仓库 http 克隆地址（**注意：不是 Git 仓库地址，而是仓库的 http 克隆地址**），弹出成功则保存成功
6. 命令面板输入 `updateTemplate`，从远程更新模板到本地，弹出成功则更新成功
7. 在左侧资源管理面板，选中目标文件夹右键点击，选择弹出面板的 `Create Template`，然后选中一个模板创建，目标文件下出现模板文件则创建成功

## 代码片段

### 导入模块

| 输入  | 输出                                             |
| ----- | ------------------------------------------------ |
| `im`  | `import packageName`                             |
| `imp` | `import name from packageName`                   |
| `imd` | `import { name } from packageName `              |
| `ime` | `import * as name from packageName `             |
| `ima` | `import { name as otherName } from packageName ` |

### 导出模块

| 输入  | 输出                                            |
| ----- | ----------------------------------------------- |
| `exp` | `export default packageName`                    |
| `exd` | `export { name } from packageName`              |
| `exa` | `export { name as otherName } from packageName` |

### 解构

| 输入  | 输出                          |
| ----- | ----------------------------- |
| `dob` | `const { name } = objectName` |
| `dar` | `const [ name ] = arrayName`  |

### 函数表达式和调试

| 输入  | 输出                             |
| ----- | -------------------------------- |
| `cfu` | `const functionName = arg => {}` |
| `clg` | `console.log('name: ', name)`    |
| `cer` | `console.error('name: ', name)`  |

### React 常用片段

| 输入            | 输出                                     |
| --------------- | ---------------------------------------- |
| `useeffect`     | `useEffect(() => {}, [])`                |
| `usestate`      | `const [name, setName] = useState()`     |
| `useref`        | `const ref = useRef()`                   |
| `usecallback`   | `const name = useCallback(() => {}, [])` |
| `usememo`       | `const name = useMemo(() => {}, [])`     |
| `usenavigation` | `const navigation = useNavigation()`     |
| `useroute`      | `const { params } = useRoute()`          |
| `usehistory`    | `const history = useHistory()`           |
| `uselocation`   | `const { pathname } = useLocation()`     |
| `useform`       | `const [ form ] = Form.useForm()`        |

#### `rf`

```ts
import React from "react";

const Example = (props) => {
  return <div>hello world</div>;
};

export default Example;
```

#### `rfi`

```ts
import React, { FC } from "react";

interface IProps {}

const Example: FC<IProps> = (props) => {
  return <div>hello world</div>;
};

export default Example;
```

#### `rff`

```ts
import React, { forwardRef, useImperativeHandle } from 'react'

export interface IExampleRef {}

interface IProps {}

const Example: React.ForwardRefRenderFunction<IExampleRef, IProps> = (
  props,
  ref,
) => {
  useImperativeHandle(ref, () => ({})

  return <div>hello world</div>
}

export default forwardRef(Example)

```

### 业务常用片段

#### `columns`

```ts
const columns: ColumnsType<any> = [
  { title: "title", dataIndex: "name" },
  {
    title: "操作",
    dataIndex: "action",
    render: (value, row) => {
      return (
        <ActionText.Group>
          <ActionText status="primary" text="编辑" to="/components" />
        </ActionText.Group>
      );
    },
  },
];
```

#### `usetablepagegql`

```ts
const { tableProps, form, submit, reset, refresh } = useTablePagingGQL({
  gql: ExampleDocument,
  gqlKey: "example",
  formatParams: (values) => {
    return values;
  },
});
```

#### `usetablegql`

```ts
const { tableProps, onSubmit, onReset } = useTableListGraphQL({
  gql: ${1:gql},
  gqlDataField: '${2}',",
  gqlBuildParams: useTableListGraphQL.gqlBuildParams('input'),
  form,
})
```

#### `useformfetch`

```ts
const { loading, submit, reset } = useFormFetch({
  form,
  request,
  formValuesTypeMap: {},
  resetFieldsIgnores: [],
});
```

#### `toolbar`

```ts
<SearchFormLayout.Space>
  <Button type="primary">submit1</Button>
  <Button>submit2</Button>
</SearchFormLayout.Space>
```

#### `formsearch`

```ts
<Form form={form}>
  <SearchFormLayout.Row>
    <SearchFormLayout.Col>
      <Form.Item label="label" name="label">
        <Input />
      </Form.Item>
    </SearchFormLayout.Col>
    <SearchFormLayout.Col>
      <Form.Item>
        <SearchFormLayout.Space>
          <Button type="primary">搜索</Button>
          <Button type="default">重置</Button>
        </SearchFormLayout.Space>
      </Form.Item>
    </SearchFormLayout.Col>
  </SearchFormLayout.Row>
</Form>
```

#### `forminput`

```ts
<Form.Item label="label" name="name">
  <Input />
</Form.Item>
```

#### `formtext`

```ts
<Form.Item label="label" name="name">
  <Input.TextArea />
</Form.Item>
```

#### `formselect`

```ts
<Form.Item label="label" name="name">
  <Select options={[]} />
</Form.Item>
```

#### `formasync`

```ts
<Form.Item label="label" name="label">
  <AsyncSelect
    remote={{
      gqlKey: "example",
      gql: ExampleDocument,
    }}
  />
</Form.Item>
```

#### `formcheck`

```ts
<Form.Item label="label" name="name" valuePropName="checked">
  <Checkbox>content</Checkbox>
</Form.Item>
```

#### `formnumber`

```ts
<Form.Item label="label" name="name">
  <InputNumber />
</Form.Item>
```

#### `formswitch`

```ts
<Form.Item label="label" name="name" valuePropName="checked">
  <Switch />
</Form.Item>
```

#### `formradio`

```ts
<Form.Item label="label" name="name">
  <Radio.Group>
    <Radio value="a">item 1</Radio>
    <Radio value="b">item 2</Radio>
  </Radio.Group>
</Form.Item>
```

#### `formdate`

```ts
<Form.Item label="label" name="name">
  <DatePicker />
</Form.Item>
```

#### `formrange`

```ts
<Form.Item label="label" name="name">
  <DatePicker.RangePicker />
</Form.Item>
```

#### `formbutton`

```ts
<Form.Item>
  <Button type="primary" htmlType="submit" onClick={() => ({})}>
    submit
  </Button>
  <Button htmlType="button" onClick={() => ({})}>
    reset
  </Button>
</Form.Item>
```
