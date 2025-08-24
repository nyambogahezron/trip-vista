# Code Quality Setup

This project uses Husky, lint-staged, and Prettier to maintain code quality and consistency.

## Tools Overview

### Prettier

- **Purpose**: Code formatting
- **Configuration**: `.prettierrc.json`
- **Ignore file**: `.prettierignore`

### Husky

- **Purpose**: Git hooks management
- **Location**: `.husky/` directory

### lint-staged

- **Purpose**: Run tools on staged files only
- **Configuration**: `package.json` > `lint-staged` section

## Git Hooks

### Pre-commit Hook

- **Location**: `.husky/pre-commit`
- **Purpose**: Runs on `git commit`
- **Actions**:
  - Runs Prettier on all staged files
  - Automatically formats code before commit

### Pre-push Hook

- **Location**: `.husky/pre-push`
- **Purpose**: Runs on `git push`
- **Actions**:
  - Runs type checking across all workspaces
  - Runs all tests

## Available Scripts

### Format Commands

```bash
# Format all files
pnpm format

# Check formatting without making changes
pnpm format:check
```

### Development Workflow

1. **Make changes** to your code
2. **Stage changes**: `git add <files>`
3. **Commit**: `git commit -m "message"`
   - Pre-commit hook automatically formats staged files
4. **Push**: `git push`
   - Pre-push hook runs type checking and tests

## Prettier Configuration

Located in `.prettierrc.json`:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

## File Types Formatted

- JavaScript (`.js`, `.jsx`)
- TypeScript (`.ts`, `.tsx`)
- JSON (`.json`)
- CSS/SCSS (`.css`, `.scss`)
- Markdown (`.md`, `.mdx`)
- YAML (`.yaml`, `.yml`)

## Bypassing Hooks (Emergency Only)

If you need to bypass hooks temporarily:

```bash
# Skip pre-commit hook
git commit --no-verify -m "emergency commit"

# Skip pre-push hook
git push --no-verify
```

**Note**: Use `--no-verify` sparingly and only in emergencies. Always run the checks manually afterward.

## IDE Integration

Consider installing Prettier extensions for your IDE:

- VS Code: "Prettier - Code formatter"
- Enable "Format on Save" for automatic formatting

## Troubleshooting

### Pre-commit hook fails

1. Check if files have syntax errors
2. Run `pnpm format` manually to fix formatting issues
3. Re-stage files and commit again

### Pre-push hook fails

1. Run `pnpm check-types` to see type errors
2. Run `pnpm test` to see failing tests
3. Fix issues and try pushing again

### Manual Commands

If hooks aren't working, you can run them manually:

```bash
# Run lint-staged manually
pnpm lint-staged

# Run pre-push checks manually
pnpm check-types && pnpm test
```
