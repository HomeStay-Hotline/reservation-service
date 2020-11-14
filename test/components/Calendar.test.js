import React from 'react';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';

import Calendar from '../../client/components/Calendar';

describe('Calendar Testing', () => {
  test('it should render the calendar header', () => {
    const wrapper = shallow(<Calendar />);
    expect(wrapper.find('.header')).toHaveLength(2);
  });
});
