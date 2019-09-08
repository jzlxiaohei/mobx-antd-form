import * as React from 'react';
import { DatePicker } from 'antd';
import formHoc from '../hoc';
import { IFormComponentProps } from '../types';
import moment, { Moment } from 'moment';
import { RangePickerValue } from 'antd/lib/date-picker/interface';

type dayFlag = 'end' | 'start';
interface IProps {
  unix?: boolean;
  dayFlags?: dayFlag[];
  showTime?: boolean;
}

function FormDate(props: IFormComponentProps) {
  function handleChange(dates: RangePickerValue) {
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
  const dayFlags = props.dayFlags;
  if (dayFlags) {
    if (props.showTime) {
      console.warn(`showTime and startOfDay both be true, do nothing`);
    } else {
      moments.map((m, index) => {
        if (dayFlags[index] === 'start') {
          m.startOf('day');
        } else if (dayFlags[index] === 'end') {
          m.endOf('day');
        }
        return m;
      });
    }
  }
  return moments.map(m => (props.unix ? m.unix() : m.valueOf()));
};

export default formHoc(FormDate);
