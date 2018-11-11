require('jest');
import { shallow } from 'enzyme';

import FieldFeedbackPanel from '../../../../src/components/form/FieldFeedbackPanel';

describe('DateInput', () => {

	let fieldError;

	beforeEach(() => {
		fieldError = {
			valid: true,
			fieldError: {
				field: 'testField',
				message: 'testMessage'
			}
		  }
	});

	it('should render a hidden span when there are no errors', () => {
		let element = shallow(FieldFeedbackPanel(fieldError));

		expect(element.prop('className')).toBe('glyphicon glyphicon-ok form-control-feedback');

		expect(element.prop('aria-hidden')).toBe('true')
	});

	it('should render error message when field errors are provided', () => {
		fieldError.valid = false;

		let element = shallow(FieldFeedbackPanel(fieldError));

		expect(element.find('span').length).toBe(3)

		expect(element.find('span').at(1).prop('className')).toBe('glyphicon glyphicon-remove form-control-feedback')
		expect(element.find('span').at(1).prop('aria-hidden')).toBe('true')

		expect(element.find('span').at(2).prop('className')).toBe('help-inline')
		expect(element.find('span').at(2).text()).toBe('testMessage')
	});



	it('should render null when invalid and now fieldError', () => {
		fieldError.valid = false;
		fieldError.fieldError = null;

		let element = FieldFeedbackPanel(fieldError);

		expect(element).toBe(null)
	});
});