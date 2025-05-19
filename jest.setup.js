const CONSOLE_FAIL_TYPES = ["error", "warn"];

/**
 * Throws an error whenever  `console.error` or `console.warn` happens
 * If we're expecting `console.error` or `console.warn` then you should mock it out using `jest.spyOn`
 * and test that the warning occurs.
 *
 * test('should log a warning', () => {
 *   jest.spyOn(console, 'warn').mockImplementation()
 *
 *   // assert the expected warning
 *   expect(console.warn).toHaveBeenCalledWith(
 *     expect.stringContaining('Empty titles are deprecated.'),
 *   )
 * })
 */
CONSOLE_FAIL_TYPES.forEach((type) => {
  console[type] = (message) => {
    throw new Error(
      `Expected test not to call console.${type}().\n\nIf the warning is expected, test for it explicitly by mocking it out using jest.spyOn(console, '${type}') and test that the warning occurs.\n\n${message}`,
    );
  };
});
