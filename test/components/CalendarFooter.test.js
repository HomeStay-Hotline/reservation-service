import React from 'react';
import { shallow } from 'enzyme';
import CalendarFooter from '../../client/components/CalendarFooter';

describe('<CalendarFooter />', () => {
  test('it should render an underlined text that says "clear dates"', () => {
    const wrapper = shallow(<CalendarFooter />);
    expect(wrapper.find('u')).toHaveLength(1);
    expect(wrapper.text()).toEqual('Clear dates');
  });
});
