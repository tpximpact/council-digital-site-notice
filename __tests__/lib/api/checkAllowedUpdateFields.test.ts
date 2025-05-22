import { checkAllowedUpdateFields } from "@/lib/api/checkAllowedUpdateFields";

describe("checkAllowedUpdateFields", () => {
  it("returns false if objects are identical (ignoring metadata)", () => {
    const app = {
      _id: "1",
      _type: "foo",
      _rev: "abc",
      _createdAt: "2020-01-01",
      _updatedAt: "2020-01-02",
      applicationNumber: "A1",
      name: "Test",
      showAccess: true,
      access: "foo",
    };
    const data = {
      _id: "2",
      _type: "foo",
      _rev: "def",
      _createdAt: "2020-01-03",
      _updatedAt: "2020-01-04",
      applicationNumber: "A2",
      name: "Test",
      showAccess: true,
      access: "foo",
    };
    expect(checkAllowedUpdateFields(app, data)).toBe(false);
  });

  it("returns true if a visible field changes", () => {
    const app = { name: "Test", showAccess: true, access: "foo" };
    const data = { name: "Test2", showAccess: true, access: "foo" };
    expect(checkAllowedUpdateFields(app, data)).toBe(true);
  });

  it("returns false if a hidden field changes but its toggle is false", () => {
    const app = { showAccess: false, access: "foo" };
    const data = { showAccess: false, access: "bar" };
    expect(checkAllowedUpdateFields(app, data)).toBe(false);
  });

  it("returns true if a hidden field's toggle changes", () => {
    const app = { showAccess: false, access: "foo" };
    const data = { showAccess: true, access: "foo" };
    expect(checkAllowedUpdateFields(app, data)).toBe(true);
  });

  it("returns false if arrays are equal (order-insensitive)", () => {
    const app = { showAccess: true, access: ["a", "b"] };
    const data = { showAccess: true, access: ["a", "b"] };
    expect(checkAllowedUpdateFields(app, data)).toBe(false);
  });

  it("returns true if arrays differ", () => {
    const app = { showAccess: true, access: ["a", "b"] };
    const data = { showAccess: true, access: ["a", "c"] };
    expect(checkAllowedUpdateFields(app, data)).toBe(true);
  });

  it("returns false if all differences are in ignored fields", () => {
    const app = {
      _id: "1",
      _type: "foo",
      _rev: "abc",
      _createdAt: "2020-01-01",
      _updatedAt: "2020-01-02",
      applicationNumber: "A1",
      showAccess: false,
      showOpenSpace: false,
      showHousing: false,
      showCarbon: false,
      showJobs: false,
    };
    const data = {
      _id: "2",
      _type: "foo",
      _rev: "def",
      _createdAt: "2020-01-03",
      _updatedAt: "2020-01-04",
      applicationNumber: "A2",
      showAccess: false,
      showOpenSpace: false,
      showHousing: false,
      showCarbon: false,
      showJobs: false,
    };
    expect(checkAllowedUpdateFields(app, data)).toBe(false);
  });
});
