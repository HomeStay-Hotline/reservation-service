import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';

import ReservationForm from '../../client/components/ReservationForm';

const mockHandleGuestSelectClick = jest.fn();

describe('<ReservationForm />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ReservationForm handleGuestSelectClick={mockHandleGuestSelectClick} />);
  });

  test('it should render a form for the Reservation module', () => {
    expect(wrapper.is('.formWrapper')).toBe(true);
  });

  test('it should invoke handleGuestSelectClick on click event', () => {
    const guestSelect = wrapper.find('.guestSelect').find('td').at(1);
    guestSelect.simulate('click');
    expect(mockHandleGuestSelectClick).toBeCalled();
  });
});
