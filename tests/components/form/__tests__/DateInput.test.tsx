require('jest');
import * as React from 'react';
import { shallow } from 'enzyme';

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

});
