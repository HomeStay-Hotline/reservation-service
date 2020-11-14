import React from 'react';
import { shallow } from 'enzyme';

import Calendar from '../../client/components/Calendar';
import CalendarHeader from '../../client/components/CalendarHeader';
import CalendarBody from '../../client/components/CalendarBody';
import CalendarFooter from '../../client/components/CalendarFooter';

describe('<Calendar />', () => {
  test('it should render the calendar with three Calendar-related components', () => {
    const wrapper = shallow(<Calendar />);
    expect(wrapper.containsAllMatchingElements([
      <CalendarHeader />,
      <CalendarBody />,
      <CalendarFooter />,
    ]));
  });
});
