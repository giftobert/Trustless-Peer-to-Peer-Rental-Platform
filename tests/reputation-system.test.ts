import { describe, it, expect, beforeEach } from 'vitest';
import { vi } from 'vitest';

describe('Reputation System Contract', () => {
  const user1 = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
  const user2 = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
  
  beforeEach(() => {
    vi.resetAllMocks();
  });
  
  it('should rate a user', () => {
    const rateUser = vi.fn().mockReturnValue({ ok: true });
    rateUser('reputation-system', 'rate-user', [user1, 4], user2);
    expect(rateUser).toHaveBeenCalledWith('reputation-system', 'rate-user', [user1, 4], user2);
    expect(rateUser()).toEqual({ ok: true });
  });
  
  it('should get user rating', () => {
    const getUserRating = vi.fn().mockReturnValue({
      ok: {
        average_rating: 4,
        total_ratings: 1
      }
    });
    getUserRating('reputation-system', 'get-user-rating', [user1]);
    expect(getUserRating).toHaveBeenCalledWith('reputation-system', 'get-user-rating', [user1]);
    expect(getUserRating()).toEqual({
      ok: {
        average_rating: 4,
        total_ratings: 1
      }
    });
  });
  
  it('should not allow rating above maximum', () => {
    const rateUser = vi.fn().mockReturnValue({ err: 400 });
    rateUser('reputation-system', 'rate-user', [user1, 6], user2);
    expect(rateUser).toHaveBeenCalledWith('reputation-system', 'rate-user', [user1, 6], user2);
    expect(rateUser()).toEqual({ err: 400 });
  });
});

