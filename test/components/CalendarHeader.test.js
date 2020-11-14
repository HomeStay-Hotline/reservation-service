import React from 'react';
import { shallow } from 'enzyme';
import CalendarHeader from '../../client/components/CalendarHeader';

describe('<CalendarHeader />', () => {
  test('it should render an h1 and h3', () => {
    const wrapper = shallow(<CalendarHeader />);
    expect(wrapper.find('h1')).toHaveLength(1);
    expect(wrapper.find('h3')).toHaveLength(1);
  });
});
