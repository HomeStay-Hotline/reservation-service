import React from 'react';
import { shallow } from 'enzyme';

import Calendar from '../../client/components/Calendar';
import CalendarBody from '../../client/components/CalendarBody';

describe('<Calendar />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Calendar />);
  });

  test('it should render the calendar header', () => {
    expect(wrapper.find('.header').find('h1')).toHaveLength(1);
    expect(wrapper.find('.header').find('h1').text()).toEqual('Select check-in date');

    expect(wrapper.find('.header').find('h3')).toHaveLength(1);
    expect(wrapper.find('.header').find('h3').text()).toEqual('Add your travel dates for exact pricing');
  });

  test('it should render the calendar body', () => {
    expect(wrapper.contains(<CalendarBody />));
  });

  test('it should render the calendar footer', () => {
    expect(wrapper.find('.footer').find('button')).toHaveLength(1);
    expect(wrapper.find('.footer').find('button').text()).toEqual('Clear dates');
  });

  test('it should call clearDates when "Clear dates" is clicked', () => {
    const clearSpy = jest.spyOn(Calendar.prototype, 'clearDates');
    wrapper = shallow(<Calendar />);

    wrapper.find('button').simulate('click');

    expect(clearSpy).toHaveBeenCalledTimes(1);
  });
});
