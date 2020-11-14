import React from 'react';
import { shallow } from 'enzyme';
import CalendarBody from '../../client/components/CalendarBody';

describe('<CalendarBody />', () => {
  test('it should render two divs representing months', () => {
    const wrapper = shallow(<CalendarBody />);
    expect(wrapper.find('.month')).toHaveLength(2);
  });
});
