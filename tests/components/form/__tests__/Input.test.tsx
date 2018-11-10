require('jest');
import * as React from 'react';
import { shallow } from 'enzyme';

import FieldFeedbackPanel from '../../../../src/components/form/FieldFeedbackPanel';
import { IInputChangeHandler, IError, IConstraint } from '../../../../src/types';

import Input from '../../../../src/components/form/Input';

describe('Input', () => {

  const onChange = (name, value, error) => {
    onChangeResult = { name, value, error };
  };

  let input = null;
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

    input = shallow(<Input object={object}
      label='My Field'
      name='myField'
      error={noErrors}
      onChange={onChange}
      />);

      inputWithErrors = shallow(<Input object={object}
        label='My Field'
        name='myField'
        error={withErrors}
        onChange={onChange}
        />);
  });

  it('should render label', () => {
    expect(input.find('.control-label').text()).toBe('My Field');
  });

  it('should render value', () => {
    expect(input.find('input').props().value).toBe('blabla');
  });

  it('should be valid', () => {  
    expect(input.find('.has-error').length).toBe(0);
    expect(input.find(FieldFeedbackPanel).props().valid).toBe(true);
  });

  it('should change to new value', () => {
    input.find('input').simulate('change', { target: { value: 'My new value' } });

    expect(onChangeResult).toBeTruthy();
    expect(onChangeResult.name).toBe('myField');
    expect(onChangeResult.value).toBe('My new value');
    expect(onChangeResult.error).toBeFalsy();
  });

  it('should render correctly with field error', () => {
    expect(inputWithErrors.find('.has-error').length).toBe(1);
    expect(inputWithErrors.find(FieldFeedbackPanel).props().valid).toBe(false);
    expect(inputWithErrors.find(FieldFeedbackPanel).props().fieldError).toBe(withErrors.fieldErrors.myField);
  });

  it('should checked constrains on input change', () => {

    const constraint: IConstraint = {
      message: 'Invalid',
      validate: jest.fn()
    };

    const input = shallow(<Input object={object}
      label='My Field'
      name='myField'
      error={noErrors}
      onChange={onChange}
      constraint={constraint as any}
      />);

      input.find('input').simulate('change', { target: { value: 'My new value' } });
      expect(constraint.validate).toHaveBeenCalledWith('My new value');
  });
});
