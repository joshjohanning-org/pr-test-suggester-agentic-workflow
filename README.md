# PR Test Suggester Agentic Workflow

This repository contains a GitHub Agentic Workflow that runs on new or updated pull requests and asks a Copilot-powered agent to identify obvious missing unit tests.

The workflow keeps the agent runtime read-only and uses a `push-to-pull-request-branch` safe output to add test-only changes back to the triggering PR branch.

The sample app is intentionally small: `src/cart.js` has existing unit tests in `test/cart.test.js`, so you can create a feature branch, add behavior, and watch the agentic workflow add missing tests to the same PR.

## Workflow

- Source: `.github/workflows/pr-test-suggester.md`
- Compiled GitHub Actions workflow: `.github/workflows/pr-test-suggester.lock.yml`
- Trigger: `pull_request` events for `opened`, `synchronize`, and `ready_for_review`
- Safe outputs: push test-only changes to the triggering PR branch and post one pull request comment
- PR comment cleanup: the workflow minimizes the generic `Commit pushed` audit comment after posting the human-readable summary comment

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
- The built-in push safe output creates an audit comment. This workflow keeps that audit trail but minimizes it so the PR conversation centers on the summary of tests added.
- Agentic Workflow pushes that use the default `GITHUB_TOKEN` may not retrigger CI automatically. Configure `GH_AW_CI_TRIGGER_TOKEN` if you need the agent's test commit to trigger a fresh CI run.

## Update

After editing the Markdown workflow source, recompile:

```sh
gh aw compile pr-test-suggester
```
