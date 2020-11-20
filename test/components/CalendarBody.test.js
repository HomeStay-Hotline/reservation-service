import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';
import CalendarBody from '../../client/components/CalendarBody';

describe('<CalendarBody />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CalendarBody />);
  });
  test('it should render two divs representing months', () => {
    expect(wrapper.find('Month')).toHaveLength(2);
  });

  test('it should have a dates prop', () => {
    expect(wrapper.instance().props.dates).toBeTruthy();
  });
});
