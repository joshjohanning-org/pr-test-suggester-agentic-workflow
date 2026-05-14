# PR Test Suggester Agentic Workflow

This repository contains a GitHub Agentic Workflow that runs on new or updated pull requests and asks a Copilot-powered agent to identify obvious missing unit tests.

The workflow keeps the agent runtime read-only and uses a `push-to-pull-request-branch` safe output to add test-only changes back to the triggering PR branch.

The sample app is intentionally small: `src/cart.js` has existing unit tests in `test/cart.test.js`, so you can create a feature branch, add behavior, and watch the agentic workflow add missing tests to the same PR.

## Workflow

- Source: `.github/workflows/pr-test-suggester.md`
- Compiled GitHub Actions workflow: `.github/workflows/pr-test-suggester.lock.yml`
- Trigger: `pull_request` events for `opened`, `synchronize`, and `ready_for_review`
- Safe outputs: push test-only changes to the triggering PR branch and post one pull request comment

## Demo app

Run the sample tests:

```sh
npm test
```

Try this demo change in a branch:

1. Add a `promoCode` option to `calculateTotal` in `src/cart.js`.
2. Support `SAVE10` as 10% off after `discountAmount` and before tax.
3. Open a pull request without adding tests.

The agentic workflow should inspect the changed behavior and add obvious missing unit tests to the same PR branch.

## Notes

- Before the agent can run, configure a repository or organization Actions secret named `COPILOT_GITHUB_TOKEN`. `gh aw secrets bootstrap --non-interactive` reports this as required for Copilot workflows and recommends a fine-grained PAT with the Copilot Requests permission.
- The workflow does not modify production code.
- Existing tests should be treated as contracts.
- Agentic Workflow pushes that use the default `GITHUB_TOKEN` may not retrigger CI automatically. Configure `GH_AW_CI_TRIGGER_TOKEN` if you need the agent's test commit to trigger a fresh CI run.

## CCA integration

This repo also includes two CCA-related features:

### Shared hooks via copilot-setup-steps.yml

`.github/copilot-setup-steps.yml` installs hooks and skills from [`joshjohanning-org/copilot-shared-plugin`](https://github.com/joshjohanning-org/copilot-shared-plugin) into the CCA environment before the agent starts. This requires a `SHARED_PLUGIN_TOKEN` secret with `contents: read` on the shared plugin repo.

### Trigger CCA test writer via API

`.github/workflows/trigger-cca-tests.yml` starts a Copilot Cloud Agent task via the [Agent Tasks REST API](https://docs.github.com/en/rest/agent-tasks/agent-tasks?apiVersion=2026-03-10) to add missing tests. Two trigger modes:

1. **Manual:** `workflow_dispatch` — pick a branch and model.
2. **Label:** Add the `add-tests` label to a PR and CCA will create a test-addition PR against that branch.

Requires a `CCA_API_TOKEN` secret: fine-grained PAT with `Agent tasks: read and write` permission.

## Update

After editing the Markdown workflow source, recompile:

```sh
gh aw compile pr-test-suggester
```
