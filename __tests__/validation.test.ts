jest.mock('../util/client', () => {
  return {
    checkExistingReference: jest.fn(),
  };
});

import {checkExistingReference} from '../util/client';
import { validatePlanningParams } from '../util/validator';

describe('validatePlanningParams', () => {
  it('should return an error if applicationNumber is not provided', async () => {
    const data = { applicationNumber: '', description: 'Some description' };
    const result = await validatePlanningParams(data);

    expect(result.errors).toEqual([{"message": "Invalid value for field 'applicationNumber': String must contain at least 1 character(s)"}]);
    expect(result.status).toEqual(400);
    expect(result.errors).toHaveLength(1);
    expect(checkExistingReference).not.toHaveBeenCalled();
  });

  it('should return an error if applicationNumber already exists', async () => {
        const data = { applicationNumber: 'existingReference', description: 'Some description' };
        checkExistingReference.mockResolvedValue({"exists":true});
        const result = await validatePlanningParams(data);
    
        expect(result.errors).toEqual([{"message":"Invalid value for field 'exists': Reference must be unique"}]);
        expect(result.status).toEqual(400);
        expect(result.errors).toHaveLength(1);
        expect(checkExistingReference).toHaveBeenCalledWith('existingReference');

        checkExistingReference.mockResolvedValue({"exists":false});
        const result2 = await validatePlanningParams(data);
    
        expect(result2.status).toEqual(200)
        expect(result2.errors).toHaveLength(0);
      });

      it('should return an error if schema not met is not provided', async () => {
        const data = { applicationNumber: '23123', description: 'Some description', address: 123, applicationType: 123, applicationStage: 123, height: '123', developmentType: 123, commentDeadline: 123, openSpaceGardens: 123 };
        const result = await validatePlanningParams(data);
    
        expect(result.errors).toEqual([{"message":"Invalid value for field 'address': Expected string, received number"},{"message":"Invalid value for field 'applicationType': Expected string, received number"},{"message":"Invalid value for field 'applicationStage': Expected string, received number"},{"message":"Invalid value for field 'height': Expected number, received string"},{"message":"Invalid value for field 'developmentType': Expected string, received number"},{"message":"Invalid value for field 'commentDeadline': Expected date, received number"},{"message":"Invalid value for field 'openSpaceGardens': Expected boolean, received number"}]);
        expect(result.status).toEqual(400);
        expect(result.errors).toHaveLength(7);
        expect(checkExistingReference).toHaveBeenCalledTimes(2);
      });
}); 