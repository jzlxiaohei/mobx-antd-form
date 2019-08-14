import * as React from 'react';
import { DatePicker } from 'antd';
import formHoc, { IOriginProps } from './utils/hoc';
import moment, { Moment } from 'moment';
import { number } from 'prop-types';

interface IProps {
  unix: boolean;
}

function FormDate(props: IOriginProps) {
  function handleChange(dates: Moment[]) {
    props.onChange(dates);
  }
  if (!Array.isArray(props.value)) {
    throw new Error(`FormDateRange need array value`);
  }
  return <DatePicker.RangePicker {...props} value={props.value} onChange={handleChange} />;
}

FormDate.transformModelToView = function(timestamps: number[], props: IProps) {
  return timestamps.map(ts => moment(props.unix ? ts * 1000 : ts));
};

FormDate.transformViewToModel = function(moments: Moment[], props: IProps) {
  return moments.map(m => (props.unix ? m.unix() : m.valueOf()));
};

export default formHoc(FormDate);
