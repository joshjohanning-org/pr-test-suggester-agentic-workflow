---
description: "Review new pull requests and add obvious missing unit tests."
on:
  pull_request:
    types: [opened, synchronize, ready_for_review]
    forks: []
  skip-bots: [github-actions, copilot, dependabot]
  status-comment: true
permissions:
  contents: read
  pull-requests: read
  checks: read
safe-outputs:
  push-to-pull-request-branch:
    target: triggering
    max: 1
    if-no-changes: "ignore"
    excluded-files:
      - "**/*.lock"
      - "dist/**"
      - "coverage/**"
    fallback-as-pull-request: false
    check-branch-protection: false
  add-comment:
    max: 1
---

# PR Unit Test Backfill

When a pull request is opened, updated, or marked ready for review, inspect the changed code and add obvious missing unit tests directly to the pull request branch.

## Task

Review the pull request diff and determine whether the branch changes behavior that should have unit-test coverage. If there are obvious missing unit tests, add them to the PR branch.

Focus on:

- New or changed functions, methods, endpoints, commands, serializers, validators, permission checks, feature flags, or error handling.
- Edge cases introduced by the diff: empty input, null/missing values, boundary values, failed dependencies, authorization failures, retries, and backward compatibility.
- Existing test patterns near the changed files.

## Output

Prefer a same-PR code change that adds missing unit tests. Also post one concise pull request comment summarizing what you did.

If you add tests, the comment should include:

- A short summary of the changed behavior.
- The tests added and where.
- Any assumptions or uncertainty.

If no obvious missing tests can be added safely, do not change files. Post a brief comment explaining what you checked and why no test changes were made.

## Guardrails

- Only add or update unit tests.
- Do not modify production code.
- Do not modify package manifests, lockfiles, workflow files, agent files, or configuration files.
- Do not delete tests.
- Do not weaken, rewrite, or remove existing assertions.
- Do not suggest rewriting existing tests just to make implementation pass.
- Treat existing tests as contracts.
- Prefer additive tests in existing test files when that matches repo convention.
- If changing an existing test file, add new test cases only.
- Keep the work focused on unit tests only; do not perform a general code review.
- If the diff is too large or the test strategy is unclear, say what would need human clarification instead of inventing coverage requirements.
