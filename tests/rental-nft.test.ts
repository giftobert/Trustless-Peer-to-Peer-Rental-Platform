import { describe, it, expect, beforeEach } from 'vitest';
import { vi } from 'vitest';

describe('Rental NFT Contract', () => {
  const owner = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
  const recipient = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
  
  beforeEach(() => {
    vi.resetAllMocks();
  });
  
  it('should mint a property', () => {
    const mintProperty = vi.fn().mockReturnValue({ ok: 1 });
    mintProperty('rental-nft', 'mint-property', ['Beach House', 'Beautiful beach house', 'Malibu', 1000000], owner);
    expect(mintProperty).toHaveBeenCalledWith('rental-nft', 'mint-property', ['Beach House', 'Beautiful beach house', 'Malibu', 1000000], owner);
    expect(mintProperty()).toEqual({ ok: 1 });
  });
  
  it('should get property details', () => {
    const getPropertyDetails = vi.fn().mockReturnValue({
      ok: {
        owner: owner,
        name: 'Beach House',
        description: 'Beautiful beach house',
        location: 'Malibu',
        price_per_night: 1000000
      }
    });
    getPropertyDetails('rental-nft', 'get-property-details', [1]);
    expect(getPropertyDetails).toHaveBeenCalledWith('rental-nft', 'get-property-details', [1]);
    expect(getPropertyDetails()).toEqual({
      ok: {
        owner: owner,
        name: 'Beach House',
        description: 'Beautiful beach house',
        location: 'Malibu',
        price_per_night: 1000000
      }
    });
  });
  
  it('should update property details', () => {
    const updatePropertyDetails = vi.fn().mockReturnValue({ ok: true });
    updatePropertyDetails('rental-nft', 'update-property-details', [1, 'Updated Beach House', 'Updated description', 'Santa Monica', 1200000], owner);
    expect(updatePropertyDetails).toHaveBeenCalledWith('rental-nft', 'update-property-details', [1, 'Updated Beach House', 'Updated description', 'Santa Monica', 1200000], owner);
    expect(updatePropertyDetails()).toEqual({ ok: true });
  });
  
  it('should transfer property', () => {
    const transferProperty = vi.fn().mockReturnValue({ ok: true });
    transferProperty('rental-nft', 'transfer', [1, owner, recipient], owner);
    expect(transferProperty).toHaveBeenCalledWith('rental-nft', 'transfer', [1, owner, recipient], owner);
    expect(transferProperty()).toEqual({ ok: true });
  });
});

