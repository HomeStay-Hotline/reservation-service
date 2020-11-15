import React from 'react';
import { shallow } from 'enzyme';
import Month from '../../client/components/Month';

describe('<Month />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Month month="November 2020" left />);
  });

  test('it should render a table element', () => {
    expect(wrapper.find('table')).toHaveLength(1);
  });

  test('it should render the abbreviated days of the week', () => {
    expect(wrapper.find('.weekday')).toHaveLength(7);
  });

  test('it should have "month" and "left" props', () => {
    expect(wrapper.instance().props.month).toEqual('November 2020');
    expect(wrapper.instance().props.left).toEqual(true);
  });
});
