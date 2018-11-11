require('jest');
import * as React from 'react';
import { shallow } from 'enzyme';

import FieldFeedbackPanel from '../../../../src/components/form/FieldFeedbackPanel';

import SelectInput from '../../../../src/components/form/SelectInput';

describe('SelectInput', () => {

	let object = null;
	let noErrors = null;
	let input = null;
	let inputWithErrors = null;
	let withErrors = null;
	let selectionOptions = null;

	let onChangeResult = null;

	beforeEach(() => {
		const onChange = (name, value, error) => {
			onChangeResult = { name, value, error };
		  };

		object = {
			myField: 'blabla'
		};

		noErrors = {
			fieldErrors: {}
		};

		selectionOptions = [
			{
				value: "testValueOne",
				name: "testNameOne"
			},
			{
				value: "testValueTwo",
				name: "testNameTwo"
			},
			{
				value: "testValueThree",
				name: "testNameThree"
			},
		];

		onChangeResult = null;

		withErrors = {
			fieldErrors: {
			  myField: {
				field: 'myField',
				message: 'There was an error'
			  }
			}
		  };

		input = shallow(<SelectInput object={object}
			label='My Field'
			name='myField'
			error={noErrors}
			options={selectionOptions}
			onChange={onChange}
		/>);

		inputWithErrors = shallow(<SelectInput object={object}
			label='My Field'
			name='myField'
			error={withErrors}
			options={selectionOptions}
			onChange={onChange}
		/>);
	});

	it('should render label', () => {
		expect(input.find('.control-label').text()).toBe('My Field');
	});

  it('should be valid', () => {  
    expect(input.find('.has-error').length).toBe(0);
    expect(input.find(FieldFeedbackPanel).props().valid).toBe(true);
	});

	it('should render first options name', () => {
		expect(input.find('option').at(0).text()).toBe('testNameOne');
	});

	it('should render first options value', () => {
		expect(input.find('option').at(0).prop('value')).toBe('testValueOne');
	});

	it('should render second options name', () => {
		expect(input.find('option').at(1).text()).toBe('testNameTwo');
	});

	it('should render second options value', () => {
		expect(input.find('option').at(1).prop('value')).toBe('testValueTwo');
	});

	it('should render third options name', () => {
		expect(input.find('option').at(2).text()).toBe('testNameThree');
	});

	it('should render third options value', () => {
		expect(input.find('option').at(2).prop('value')).toBe('testValueThree');
	});

	it('should render correctly with field error', () => {
		expect(inputWithErrors.find('.has-error').length).toBe(1);
		expect(inputWithErrors.find(FieldFeedbackPanel).props().valid).toBe(false);
		expect(inputWithErrors.find(FieldFeedbackPanel).props().fieldError).toBe(withErrors.fieldErrors.myField);
	  });
});