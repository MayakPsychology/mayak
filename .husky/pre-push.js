const branchName = process.argv[2];

const testRegExp = /^MID-[0-9]+_([a-zA-Z0-9]+-?)+[^-]$/g;

const result = testRegExp.exec(branchName);
if (result === null) {
  console.log('Branch name should be of the form: "MID-<ticket number>_<branch-name-text-in-kebab-case>"');
  console.log('Example:  "MID-123_add-this-cool-feature"');
  console.log(`Provided: "${branchName}"`);
  process.exit(1);
}
process.exit(0);
