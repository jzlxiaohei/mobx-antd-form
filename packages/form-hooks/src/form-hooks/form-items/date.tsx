import * as React from 'react';
import { DatePicker } from 'antd';
import formHoc from '../hoc';
import { IFormComponentProps } from '../types';
import moment, { Moment } from 'moment';

interface IProps {
  unix?: boolean;
  showTime?: boolean;
  dayFlag?: 'end' | 'start';
}

function FormDate(props: IFormComponentProps) {
  function handleChange(date: Moment) {
    props.onChange(date);
  }

  return <DatePicker {...props} value={props.value} onChange={handleChange} />;
}

FormDate.transformModelToView = function(timestamp: number, props: IProps) {
  if (!timestamp) {
    return undefined;
  }
  if (props.unix) {
    return moment(timestamp * 1000);
  }

  return moment(timestamp);
};

FormDate.transformViewToModel = function(momentInst: Moment, props: IProps) {
  if (!momentInst) {
    return undefined;
  }

  const dayFlag = props.dayFlag;
  if (dayFlag) {
    if (props.showTime) {
      console.warn(`showTime and startOfDay both be true, do nothing`);
    } else {
      if (dayFlag === 'start') {
        momentInst.startOf('day');
      } else if (dayFlag === 'end') {
        momentInst.endOf('day');
      }
    }
  }

  if (props.unix) {
    return momentInst.unix();
  }
  return momentInst.valueOf();
};

export default formHoc(FormDate);
