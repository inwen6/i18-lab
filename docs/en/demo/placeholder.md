# Placeholder Interpolation Preview

> i18n messages often use `{name}` / `{count}` placeholders. This small tool previews interpolation in real time when writing language packs.

<PlaceholderPreview />

## Usage

1. In the "message template" box, enter text with placeholders, e.g.:
   ```
   Hello, {name}! You have {count} new messages.
   ```
2. In the "params" box, enter a JSON object, e.g.:
   ```json
   { "name": "Xiao Ming", "count": 3 }
   ```
3. The preview below updates in real time:
   ```
   Hello, Xiao Ming! You have 3 new messages.
   ```

## Notes

- Placeholder syntax: `{letters, digits, or underscores}`
- Params must be valid JSON
- Missing keys stay as-is, so you can spot gaps

> The underlying interpolation concept is in [Vue i18n Quick Start](/en/vue-i18n/start), section 7.
