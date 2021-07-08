const github = require("@actions/github");
const core = require("@actions/core");

try {
  // const token = core.getInput('githubToken');
  const payload = JSON.stringify(github.context.payload, null, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
