# mobx-antd-form

## 起因

几点认识

1. OOP 在表达业务逻辑上更直接。
2. Form 使用双向绑定，开发效率高，代码可读性好。
3. Antd 在后台系统了，使用广泛。

综合上面的几个认识，在业务状态使用 mobx 管理的情况，实现了:

1. 双向绑定表达，表达简单直观。支持嵌套字段

2. 提供 validate 机制，配合 `<FormContext>`和`<FormButton>`, 自动管理相关状态。

3. 组件使用方式和 antd 一致，几乎没有学习成本，可以直接参考 antd 的文档。

4. 扩展性强，符合 value，onChange 模式的组件，通过简单的包装，可以快速融入进这套模式中

5. 性能。每次修改，只有被编辑的那个组件会触发渲染，form 再大，也不会有性能问题。

## 使用

0. 首先安装 react react-dom mobx mobx-react antd
1. yarn add @jzl/m-form
1. 如果使用 antd 的按需加载，为了样式生效，需要在 webpack 的 modules 的 rules 中 配置添加

```js
  {
    test: /node_modules[\\/]@jzl[\\/]m-form[\\/].*\.(j|t)sx?$/,
    use: {
      loader: "babel-loader",
      options: {// your options}
    }
  },
```

## Basic Usage

```jsx
import { useLocalStore } from 'mobx-react';
import { FormContext, FormInput, FormCheckbox } from '@jzl/m-form';

// store
const store = useLocalStore(() => ({
  text: '',
  done: false,
  toggleDone: (todo: string) => {
    store.done = !store.done;
  },
}));

// function component
return (
  <FormContext>
    <FormInput
      className="input-class"
      label="text"
      path="text"
      model={store}
      placeholder="输入todo文本"
    />
    <FormCheckbox label="done" model={store} path="done" />
  </FormContext>
);
```

## 提供的组件和设施 (待添加)

1. 组件

```
   FormInput
   FormCheckbox
   FormSelect
   FormRadioGroup
   FormDate
   FormDateRange
   FormInputNumber
```

2. 设施

```
FormContext: 提供共享上下文，比如 model（如果组件提供的 model，优先级更改）, 一些通用样式，比如 label 占多宽

FormButton: 和 FormContext 配合，自动管理验证和提交
```

## Validate

在组件上添加 ruleFn 接受 `(value: any, Model: M) => string | any`
返回值只要是非空字符串，就表明出错，提示信息就是返回的字符串

```jsx
// yourRuleFn 接受 value, 以及model（就是这里的todo)
// 返回值只要是非空字符串，就表明出错，
<FormInput model={todo} path="text" ruleFn={yourRuleFn} />
```

点击按钮后，检查所有规则，如果有错，阻止提交，给出提示（提示的样式见 antd Form.Item） 同时 disable `FormButton`，直到满足所有规则。

## Model 的书写建议

双向绑定和自动校验的功能，是依赖`mobx`的。总结了两种方式。

1. Model class: 比如

```jsx
  // 也可以不依赖 decorators, 但是代码上会有一定冗余
  class UserModel {
    @observable address = `loading...`
    @observable name = {
      first: '',
      last: '',
    }
    fetchUserInfo() {// fetch and init data}
    postUserInfo() { // post data}
  }

  <FormInput model={userModel} label="first name" path="name.first" />
  <FormInput model={userModel} label="last name" path="name.last" />
```

对于 react class component， 直接在 constructor 里 new Model() 即可。

如果配合 hooks，可以使用 `React.useRef`或者 `use-instance` 之类的第三方 hooks

如果对使用 `decorators` 有所担忧，可以参考 mobx 的 `Decorators` [相关 API](https://mobx.js.org/refguide/modifiers.html), 或者使用 `extendObservable` api。

2. 配合 hooks
   使用 `mobx-react` 的 `useLocalStore`

## 对 Antd 的修改

1. 统一 onChange 的参数（antd 中 Input 传的是 Event，CheckBox 传的 checked value）。不过双向绑定的机制，几乎不需要关注 onChange 方法。
2. FormDate 默认的 value 是时间戳，为 number 类型，13 位数字。传入 `unix={true}` value 是 10 位数字。
3. label 直接设置，其他 Antd 的 Form.Item 的属性，通过 itemProps 传入, 具体见[antd 文档](https://ant.design/components/form-cn/#Form.Item)

```jsx
  <FormInput label="input label" itemProps={...customItemProps}>
```

## value 的取值规则

1. 默认 model[path](path支持嵌套)
2. 组件提供，比如`FormDate` 提供

```jsx
function FormDate(props: IFormComponentProps) {// ...}
FormDate.transformModelToView = function(timestamp: number, props: IProps) {
  // 把model上的value，转成antd 需要的moment
};

FormDate.transformViewToModel = function(momentInst: Moment, props: IProps) {
  // 把 antd 组件的 moment 转成时间戳
};
```

3. 使用组件时传入`transformModelToView` 和 `transformViewToModel`

上面 3 个规则，优先级越来越高。

## 自定义

只要符合 value, onChange 模式的组件，可以快速融入这套体系，比如基于`react-color`的改造，只需要下面几行代码。

```jsx
import { FormItemHoc } from '@jzl/m-form';

const CustomFormComponent = FormItemHoc(function(props: IFormComponentProps) {
  function handleChange(e: ColorResult) {
    props.onChange(e.hex);
  }
  return <SketchPicker onChangeComplete={handleChange} color={props.value} />;
});
```
