# jest-each-table

Take advantage of jest's `test.each` tagged template literal functionality
without needing to hardcode the test-cases as template literals.

## Usage

```js
import createTestTable from 'jest-each-table';

const testcases = createTestTable(
  [...Array(10)].map((_, i) => ({
    inputs: { left: i, right: i },
    output: i + i
  }))
);

const testsuite = test.each(...testcases);

testsuite('$inputs.left + $inputs.right = $output', ({ inputs, output }) => {
  expect(inputs.left + inputs.right).toBe(output);
});
```

## Context

Jest's `test.each` functionality can be used in two ways:

1. [`test.each` (function)](https://jestjs.io/docs/en/api#1-testeachtable-name-fn-timeout):
   This allows an `Array` of `Arrays` with the arguments that are passed into
   the test fn for each row.
2. [`test.each` (tagged template literal)](https://jestjs.io/docs/en/api#2-testeach-table-name-fn-timeout):
   This allows a table of test-cases to be defined as an ES2015 string template.

Unfortunately `test.each` (the function) uses `printf` formatting for creating
the test title which has serious drawbacks compared to how the title is
formatted using `test.each` (the tagged template literal) which supports
`$variable`.
