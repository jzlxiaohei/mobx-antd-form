const ignoreFields = [
  'model',
  'path',
  'value',
  'onChange',
  'beforeChange',
  'afterChange',
  'getValue',
  'transformViewToModel',
  'transformModelToView',
  'label',
  'itemProps',
  'rules',
  'noFormItem',
  'needValidate',
  'validateInfoManager',
  'inputPropsFromContext',
  'suffixTip',
  'defaultRuleFn',
  'children',
];

export function omitCommonProps(props: any) {
  const result = {} as any;
  for (let field in props) {
    if (props.hasOwnProperty(field) && ignoreFields.indexOf(field) === -1) {
      result[field] = props[field];
    }
  }
  return result;
}
