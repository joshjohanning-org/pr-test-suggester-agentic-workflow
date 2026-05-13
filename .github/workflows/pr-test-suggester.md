---
description: "Review new pull requests and suggest obvious missing unit tests."
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
  add-comment:
    max: 1
---

# PR Unit Test Suggester

When a pull request is opened, updated, or marked ready for review, inspect the changed code and identify obvious missing unit tests.

## Task

Review the pull request diff and determine whether the branch changes behavior that should have unit-test coverage.

Focus on:

- New or changed functions, methods, endpoints, commands, serializers, validators, permission checks, feature flags, or error handling.
- Edge cases introduced by the diff: empty input, null/missing values, boundary values, failed dependencies, authorization failures, retries, and backward compatibility.
- Existing test patterns near the changed files.

## Output

Post one concise pull request comment.

If obvious missing tests exist, include:

- A short summary of the changed behavior.
- A checklist of specific missing unit tests.
- Suggested test file locations, matching the repository's existing conventions.
- Any assumptions or uncertainty.

If no obvious missing tests are found, post a brief comment saying no obvious missing unit-test gaps were found and mention what evidence you checked.

## Guardrails

- Do not modify files.
- Do not create commits or pull requests.
- Do not suggest rewriting existing tests just to make implementation pass.
- Treat existing tests as contracts.
- Prefer additive test suggestions.
- Keep the comment focused on unit tests only; do not perform a general code review.
- If the diff is too large or the test strategy is unclear, say what would need human clarification instead of inventing coverage requirements.
