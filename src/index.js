const Separator = '|';

function getColumnTitlesFor(testcases) {
  const keys = testcases.reduce((state, object) => new Set([...state, ...Object.keys(object)]), new Set());
  return ['#', ...keys];
}

function getColumnValuesFor(columns, testcases) {
  return testcases.reduce(
    (values, testcase, index) => [
      ...values,
      ...columns.reduce((state, column) => [...state, column === '#' ? index + 1 : testcase[column]], [])
    ],
    []
  );
}

module.exports = function createTestTableFrom(testcases) {
  const columnTitles = getColumnTitlesFor(testcases);
  const numberOfColumns = columnTitles.length;
  const separators = [...Array(numberOfColumns * testcases.length)].map((_, index) =>
    index % numberOfColumns === numberOfColumns - 1 ? '\n' : Separator
  );

  const quasis = [`\n${columnTitles.join(Separator)}\n`, ...separators];
  const expressions = getColumnValuesFor(columnTitles, testcases);

  return [quasis, ...expressions];
};
