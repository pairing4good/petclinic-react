require('jest');
import * as React from 'react';
import { shallow } from 'enzyme';

import FieldFeedbackPanel from '../../../../src/components/form/FieldFeedbackPanel';

import DateInput from '../../../../src/components/form/DateInput';

describe('DateInput', () => {

  const onChange = (name, value, error) => {
    onChangeResult = { name, value, error };
  };

  let dateInput = null;
  let inputWithErrors = null;
  let object = null;
  let onChangeResult = null;
  let noErrors = null;
  let withErrors = null;

  beforeEach(() => {
    object = {
      myField: 'blabla'
    };

    noErrors = {
      fieldErrors: {}
    };

    withErrors = {
      fieldErrors: {
        myField: {
          field: 'myField',
          message: 'There was an error'
        }
      }
    };

    onChangeResult = null;

    dateInput = shallow(<DateInput object={object}
      label='My Field'
      name='myField'
      error={noErrors}
      onChange={onChange}
      />);

      inputWithErrors = shallow(<DateInput object={object}
        label='My Field'
        name='myField'
        error={withErrors}
        onChange={onChange}
        />);
  });

  it('should render label', () => {
    expect(dateInput.find('.control-label').text()).toBe('My Field');
  });

  it('should render date picker', () => {
    expect(dateInput.find('.form-control').text()).toBe('<DatePicker />');
  });

  it('should formate date', () => {
    expect(dateInput.find('.form-control').prop('dateFormat')).toBe('YYYY-MM-DD');
  });

  it('should render hidden feedback', () => {
    expect(dateInput.find('.form-control-feedback').prop('aria-hidden')).toBe('true');
  });

  it('should be valid', () => {  
    expect(dateInput.find('.has-error').length).toBe(0);
    expect(dateInput.find(FieldFeedbackPanel).props().valid).toBe(true);
	});

  it('should render correctly with field error', () => {
		expect(inputWithErrors.find('.has-error').length).toBe(1);
		expect(inputWithErrors.find(FieldFeedbackPanel).props().valid).toBe(false);
		expect(inputWithErrors.find(FieldFeedbackPanel).props().fieldError).toBe(withErrors.fieldErrors.myField);
	  });
});
