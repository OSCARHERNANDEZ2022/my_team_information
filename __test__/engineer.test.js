const Lead = require("../lib/lead");

test("Can set GitHub account via constructor", () => {
  const testValue = "GitHubUser";
  const e = new Lead("Foo", 1, "test@test.com", testValue);
  expect(e.github).toBe(testValue);
});

// test('getRole() should return "Lead"', () => {
//   const testValue = "Lead";
//   const e = new Lead("Foo", 1, "test@test.com", "GitHubUser");
//   expect(e.getRole()).toBe(testValue);
// });

test("Can get GitHub username via getGithub()", () => {
  const testValue = "GitHubUser";
  const e = new Lead("Foo", 1, "test@test.com", testValue);
  expect(e.getGithub()).toBe(testValue);
});
