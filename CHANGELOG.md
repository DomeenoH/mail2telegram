# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2025-12-31

### Added
- **AI Summary Optimization**: 
  - Implemented professional Chinese prompts for email summarization.
  - Added support for Markdown rendering in Telegram message bubbles.
  - Added a fail-safe mechanism to fallback to plain text if Markdown rendering fails due to special characters.
- **Documentation**: Created `docs/AI_SUMMARY_OPTIMIZATION.md` detailing the AI summary architecture and configuration.
- **Safety**: Added `wrangler.example.jsonc` as a template for secure collaboration.

### Changed
- **Model Upgrade**: Switched the default Workers AI model to `@cf/google/gemma-3-12b-it` for better performance and multilingual accuracy.
- **Config Improvement**: Optimized `wrangler.jsonc` variables and strengthened `package.json` package manager definitions.

### Fixed
- Resolved the "silent fail" issue when AI models returned empty results or Telegram rejected malformed Markdown.
- Updated deprecated model references to valid 2025-end versions.
