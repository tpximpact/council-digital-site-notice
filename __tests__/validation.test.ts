jest.mock('../util/client', () => {
  return {
    checkExistingReference: jest.fn(),
  };
});

import {checkExistingReference} from '../util/client';
import { validatePlanningParams } from '../util/validator';

describe('validatePlanningParams', () => {
  it('should return an error if reference is not provided', async () => {
    const data = { reference: '', description: 'Some description' };
    const result = await validatePlanningParams(data);

    expect(result).toContain('Reference parameter is required');
    expect(result).toHaveLength(1);
    expect(checkExistingReference).not.toHaveBeenCalled();
  });

  it('should return an error if reference already exists', async () => {
        const data = { reference: 'existingReference', description: 'Some description' };
        checkExistingReference.mockResolvedValue(true);
        const result = await validatePlanningParams(data);
    
        expect(JSON.stringify(result)).toBe('["Reference must be unique"]');
        expect(result).toHaveLength(1);
        expect(checkExistingReference).toHaveBeenCalledWith('existingReference');

        checkExistingReference.mockResolvedValue(false);
        const result2 = await validatePlanningParams(data);
    
        expect(JSON.stringify(result2)).toBe('[]')
    
      });
}); 