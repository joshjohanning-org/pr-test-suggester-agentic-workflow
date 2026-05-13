# PR Test Suggester Agentic Workflow

This repository contains a GitHub Agentic Workflow that runs on new or updated pull requests and asks a Copilot-powered agent to identify obvious missing unit tests.

The workflow is intentionally read-only during agent execution. It posts one pull request comment with suggested missing tests and does not edit files, create commits, or open pull requests.

## Workflow

- Source: `.github/workflows/pr-test-suggester.md`
- Compiled GitHub Actions workflow: `.github/workflows/pr-test-suggester.lock.yml`
- Trigger: `pull_request` events for `opened`, `synchronize`, and `ready_for_review`
- Safe output: one pull request comment

## Update

After editing the Markdown workflow source, recompile:

```sh
gh aw compile pr-test-suggester
```

