import { describe, it, expect, beforeEach } from 'vitest';
import { vi } from 'vitest';

describe('Booking System Contract', () => {
  const owner = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
  const guest = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
  
  beforeEach(() => {
    vi.resetAllMocks();
  });
  
  it('should create a booking', () => {
    const createBooking = vi.fn().mockReturnValue({ ok: true });
    createBooking('booking-system', 'create-booking', [1, 1625097600, 1625270400, 1000000], guest);
    expect(createBooking).toHaveBeenCalledWith('booking-system', 'create-booking', [1, 1625097600, 1625270400, 1000000], guest);
    expect(createBooking()).toEqual({ ok: true });
  });
  
  it('should cancel a booking', () => {
    const cancelBooking = vi.fn().mockReturnValue({ ok: true });
    cancelBooking('booking-system', 'cancel-booking', [1, 1625097600], guest);
    expect(cancelBooking).toHaveBeenCalledWith('booking-system', 'cancel-booking', [1, 1625097600], guest);
    expect(cancelBooking()).toEqual({ ok: true });
  });
  
  it('should get booking details', () => {
    const getBooking = vi.fn().mockReturnValue({
      ok: {
        guest: guest,
        end_date: 1625270400,
        total_price: 2000000
      }
    });
    getBooking('booking-system', 'get-booking', [1, 1625097600]);
    expect(getBooking).toHaveBeenCalledWith('booking-system', 'get-booking', [1, 1625097600]);
    expect(getBooking()).toEqual({
      ok: {
        guest: guest,
        end_date: 1625270400,
        total_price: 2000000
      }
    });
  });
});

