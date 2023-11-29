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

    expect(result).toEqual({"errors": [{"message": "Invalid value for field 'reference': String must contain at least 1 character(s)"}], "status": 400});
    expect(result.errors).toHaveLength(1);
    expect(checkExistingReference).not.toHaveBeenCalled();
  });

  it('should return an error if reference already exists', async () => {
        const data = { reference: 'existingReference', description: 'Some description' };
        checkExistingReference.mockResolvedValue({"exists":true});
        const result = await validatePlanningParams(data);
    
        expect(result).toEqual({"status": 400,"errors":[{"message":"Invalid value for field 'exists': Reference must be unique"}]});
        expect(result.errors).toHaveLength(1);
        expect(checkExistingReference).toHaveBeenCalledWith('existingReference');

        checkExistingReference.mockResolvedValue({"exists":false});
        const result2 = await validatePlanningParams(data);
    
        expect(result2).toEqual({"status": 200, "errors":[]})
    
      });
}); 