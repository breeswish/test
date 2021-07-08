const github = require("@actions/github");
const core = require("@actions/core");

async function doAddLabels(labels) {
  if (!github.context.payload.pull_request) {
    return;
  }
  console.log("Adding labels", labels);
  const token = core.getInput("githubToken");
  const octokit = github.getOctokit(token);
  console.log({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: github.context.repo.issue_number,
    labels: labels,
  });
  console.log(github.context.repo);
  await octokit.rest.issues.addLabels({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: github.context.repo.issue_number,
    labels: labels,
  });
}

async function run() {
  try {
    if (!github.context.payload.pull_request) {
      console.log("Not a Pull Request event, skipped");
      return;
    }

    const title = github.context.payload.pull_request.title;
    if (title.startsWith("Update TiDB Dashboard to")) {
      await doAddLabels(["component/visualization", "require-LGT1"]);
      return;
    }

    console.log("Not matching any label rules, skip");
  } catch (error) {
    console.error(error.message);
    // Do not set errors
  }
}

run();
