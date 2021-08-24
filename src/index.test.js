const createTestTable = require('./index');

const testcases = createTestTable(
  [...Array(10)].map((_, i) => ({
    inputs: { left: i, right: i },
    output: i + i
  }))
);

const testsuite = test.each(...testcases);

testsuite('Testcase $testcaseIndex: $inputs.left + $inputs.right = $output', ({ inputs, output }) => {
  expect(inputs.left + inputs.right).toBe(output);
});

test('can be used to create strings', () => {
  const [quasis, ...expressions] = testcases;
  expect(String.raw({ raw: quasis }, ...expressions.map((expression) => JSON.stringify(expression)))).toMatchSnapshot();
});
