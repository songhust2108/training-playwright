# Timesheets — Playwright Test Automation

> End-to-end test automation framework for the CO-WELL Timesheet portal, built with **Playwright + TypeScript** using the **Page Object Model (POM)** pattern.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Architecture & Layer Diagram](#architecture--layer-diagram)
- [Code Conventions](#code-conventions)
  - [File Naming](#file-naming)
  - [Class Naming](#class-naming)
  - [Function / Method Naming](#function--method-naming)
  - [Variable / Locator Naming](#variable--locator-naming)
  - [Constants](#constants)
  - [Test Data](#test-data)
- [Writing Tests (Specs)](#writing-tests-specs)
- [Code Review Checklist](#code-review-checklist)
- [Adding a New Feature](#adding-a-new-feature)
- [Available Scripts](#available-scripts)

---

## Getting Started

```bash
# 1. Clone the repository
git clone <repo-url> && cd timesheets

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install

# 4. Create a .env file (copy from .env.example or ask the team)
#    Required variables:
#      MANAGER_USERNAME=<your_username>
#      MANAGER_PASSWORD=<your_password>

# 5. Run tests
npm test
```

---

## Project Structure

```
timesheets/
├── .github/workflows/
│   └── playwright.yml                # CI pipeline
├── prompts/                          # AI prompts & reference docs
├── tests/
│   ├── actions/                      # Action layer (business logic)
│   │   ├── login.action.ts
│   │   ├── home.action.ts
│   │   ├── my-timesheet.action.ts
│   │   └── confirm-request.action.ts
│   ├── data/
│   │   ├── constants/                # Frozen constant objects
│   │   │   ├── auth.const.ts
│   │   │   ├── navigation.const.ts
│   │   │   ├── confirm-request.const.ts
│   │   │   └── popup.const.ts
│   │   └── testdata/                 # Test data sets
│   │       └── confirm-request.testdata.ts
│   ├── fixtures/                     # Custom Playwright fixtures
│   │   └── base-fixture.ts
│   ├── pages/                        # Page Objects (locators + low-level methods)
│   │   ├── extends/                  # Shared UI components
│   │   │   ├── navigation.ts
│   │   │   └── popup.ts
│   │   ├── common.page.ts            # Base page class
│   │   ├── login.page.ts
│   │   ├── home.page.ts
│   │   ├── my-timesheet.page.ts
│   │   └── confirm-request.page.ts
│   └── specs/                        # Test specifications
│       └── timesheet/
│           └── approve-timesheet.spec.ts
├── .env                              # Environment variables (gitignored)
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

---

## Architecture & Layer Diagram

```
┌──────────────────────────────────────────────────┐
│  specs/             Test files (*.spec.ts)        │
│                     Uses fixtures & actions        │
├──────────────────────────────────────────────────┤
│  fixtures/          Custom Playwright fixtures     │
│                     Injects Action instances       │
├──────────────────────────────────────────────────┤
│  actions/           Business-logic methods         │
│  LoginAction ──extends──▶ LoginPage               │
├──────────────────────────────────────────────────┤
│  pages/             Locators + low-level methods   │
│  LoginPage ──extends──▶ CommonPage                │
├──────────────────────────────────────────────────┤
│  pages/extends/     Shared UI components           │
│  Navigation, Popup  (composed into CommonPage)     │
├──────────────────────────────────────────────────┤
│  data/              Constants & Test Data           │
└──────────────────────────────────────────────────┘
```

**Inheritance chain:** `CommonPage` → `*Page` → `*Action` → injected via **Fixtures** → used in **Specs**

---

## Code Conventions

### File Naming

All files use **kebab-case** with a **type suffix** separated by a dot:

| Layer | Pattern | Example |
|---|---|---|
| Page Object | `<name>.page.ts` | `login.page.ts`, `my-timesheet.page.ts` |
| Action | `<name>.action.ts` | `login.action.ts`, `confirm-request.action.ts` |
| Constant | `<name>.const.ts` | `auth.const.ts`, `navigation.const.ts` |
| Test Data | `<name>.testdata.ts` | `confirm-request.testdata.ts` |
| Spec | `<name>.spec.ts` | `approve-timesheet.spec.ts` |
| Fixture | `base-fixture.ts` | `base-fixture.ts` |
| Shared Component | `<name>.ts` (no suffix) | `navigation.ts`, `popup.ts` |

### Class Naming

Classes use **PascalCase**. The class name reflects the file purpose:

| Layer | Convention | Example |
|---|---|---|
| Page Object | `<Name>Page` | `LoginPage`, `ConfirmRequestPage`, `CommonPage` |
| Action | `<Name>` (no suffix) | `Login`, `Home`, `ConfirmRequest` |
| Shared Component | `<Name>` | `Navigation`, `Popup` |

```typescript
// ✅ Correct
export class LoginPage extends CommonPage { }
export class Login extends LoginPage { }

// ❌ Wrong
export class loginPage extends CommonPage { }   // not PascalCase
export class LoginAction extends LoginPage { }   // Action classes don't use suffix
```

### Function / Method Naming

Methods use **camelCase** and follow a **verb-first** naming pattern:

| Element Type | Prefix Pattern | Example |
|---|---|---|
| Input field method | `input<Field>` | `inputUsername()`, `inputPassword()` |
| Button click method | `click<Element>Button` | `clickLoginButton()`, `clickConfirmRequestButton()` |
| Select/dropdown method | `select<Element>` | `selectFromList()`, `selectItemDisplayOnPage()` |
| Get data method | `get<Data>` | `getTotalRequestToMember()`, `getTotalNumberOfRecord()` |
| Verify/assert method | `verify<Condition>` | `verifyHomePageTitle()`, `verifyConfirmRequestTitle()` |
| Business logic method | `<action><Domain>` | `loginTimesheetSystem()`, `executeApproveRequestWithTwoFromList()` |
| Dynamic locator method | `<prefix><Element>By<Param>` | `chkActionByMemberId()` |

**Rules:**
- **Pages** → only low-level interaction methods (click, fill, select, get)
- **Actions** → high-level business methods that compose Page methods
- **All assertions** (`expect()`) must live in **Actions**, never in Pages
- **All `expect()` calls** must include a **custom descriptive message**
- **All public methods** in Actions must have **JSDoc comments**
- **Extract repeated logic** into `private` helper methods (e.g. `handleApprovalDialogs()`)

```typescript
// ✅ Action with JSDoc + assertion with message
export class Login extends LoginPage {
    /**
     * Authenticates a user into the timesheet system.
     * @param username The user's login ID
     * @param password The user's password
     */
    async loginTimesheetSystem(username: string, password: string) {
        await this.inputUsername(username)
        await this.inputPassword(password)
        await this.clickLoginButton()
    }
}
```

### Variable / Locator Naming

Locators are declared as **`private readonly`** fields using **camelCase** with a **Hungarian-style prefix**:

| UI Element | Prefix | Example |
|---|---|---|
| Input / Textbox | `ipt` | `iptUsername`, `iptPassword` |
| Button | `btn` | `btnLogin`, `btnConfirmRequest` |
| Checkbox | `chk` | `chkAction`, `chkActionByMemberId()` |
| Combobox / Select | `cbx` | `cbxItemOnPage`, `cbxPeriod`, `cbxStatus` |
| Text / Label | `txt` | `txtTotalRequest`, `txtTotalRequestInMonth` |
| Table row | `row` | `rowMemberRequest` |

```typescript
// ✅ Correct — private readonly with prefix
private readonly iptUsername: Locator = this.page.locator('#user');
private readonly btnLogin: Locator = this.page.getByRole('button', { name: 'Login' });

// ❌ Wrong — missing access modifier, no prefix
username: Locator = this.page.locator('#user');
```

### Constants

- Each domain/feature gets **one constant file** in `tests/data/constants/`
- Export a **single `Object.freeze()`** object per concern
- All keys use **UPPER_SNAKE_CASE**

```typescript
// auth.const.ts
export const USER = Object.freeze({
    MANAGER: {
        USER_NAME: process.env.MANAGER_USERNAME || '',
        PASSWORD: process.env.MANAGER_PASSWORD || ''
    }
})

// navigation.const.ts
export const NAVIGATION_BAR = Object.freeze({
    TIMESHEET: "Timesheet"
})

export const SIDE_BAR = Object.freeze({
    TIMESHEET: {
        MY_TIMESHEET: "My Timesheet",
        MY_LEAVE: "My Leave",
    },
    MANAGER: {
        CONFIRM_REQUEST: "Confirm request",
    }
})
```

### Test Data

- Stored in `tests/data/testdata/`
- Exported as **frozen objects** with real data (member IDs, names, etc.)
- File naming: `<feature>.testdata.ts`

---

## Writing Tests (Specs)

### Key Rules

1. **Always import `test` from `@fixtures/base-fixture`** — never from `@playwright/test` directly
2. **Use destructured fixtures** in test parameters
3. **Use `test.beforeEach`** for setup (login, navigate) and **`test.afterEach`** for cleanup
4. **Access navigation via composition**: `home.navigation.selectNavigationBar()` — do **not** create wrapper methods
5. **Group test cases** inside `test.describe()` blocks

```typescript
import { USER } from "@data/constants/auth.const";
import { NAVIGATION_BAR, SIDE_BAR } from "@data/constants/navigation.const";
import { test } from "@fixtures/base-fixture";

test.describe("Feature Name", async () => {
    test.beforeEach(async ({ login, home, commonPage }) => {
        const { navigation } = commonPage
        await navigation.visit("/")
        await login.loginTimesheetSystem(USER.MANAGER.USER_NAME, USER.MANAGER.PASSWORD)
        await home.verifyHomePageTitle()
        await home.closeWelcomePopupInHomePage()
    })

    test.afterEach(async ({ commonPage }) => {
        const { navigation } = commonPage
        await navigation.visit('/')
    })

    test('should do something', async ({ home, myTimesheet }) => {
        await home.navigation.selectNavigationBar(NAVIGATION_BAR.TIMESHEET)
        await myTimesheet.verifyMyTimesheetTitle()
        // ... test steps
    });
})
```

### Error Handling

Critical methods in **Pages & Actions** use `try-catch` with meaningful error messages:

```typescript
async getTotalRequestToMember(): Promise<number> {
    try {
        const totalRequest = await this.txtTotalRequest.textContent()
        // ... logic
    } catch (error) {
        throw new Error(`Failed to get total request count: ${error instanceof Error ? error.message : error}`)
    }
}
```

---

## Code Review Checklist

> **Every pull request must pass all items below before merging.** Use this as a self-review guide before requesting code review.

### 1. Code Structure & Organization

- [ ] Files are placed in the **correct directory** (`pages/`, `actions/`, `data/constants/`, `data/testdata/`, `specs/`, `fixtures/`)
- [ ] File names follow **`kebab-case.type.ts`** convention (e.g. `my-leave.page.ts`, `auth.const.ts`)
- [ ] Class names follow **PascalCase** convention (`MyLeavePage`, `ConfirmRequest`)
- [ ] Imports use **path aliases** (`@pages/`, `@actions/`, `@data/`, `@fixtures/`) — no relative `../../` paths
- [ ] Code is **logically grouped**: locators at top, private helpers in middle, public methods at bottom

### 2. Playwright Best Practices

- [ ] Locators use proper strategies — prefer `getByRole()`, `getByText()`, `data-testid`, or stable CSS selectors
- [ ] All async operations use **`async/await`** correctly — no floating promises
- [ ] Utilizes Playwright's **auto-waiting** — avoid manual waits unless absolutely necessary
- [ ] **No hard-coded delays** (`setTimeout`, fixed `waitForTimeout`) — use `waitForLoadState()`, `waitForSelector()`, or auto-wait instead
- [ ] Follows the **Page Object Model** — locators and low-level methods stay in `*Page` classes, business logic stays in Action classes

```typescript
// ✅ Correct — use Playwright auto-waiting
await this.page.waitForLoadState('domcontentloaded');

// ❌ Wrong — hard-coded delay
await this.page.waitForTimeout(3000);
```

### 3. Error Handling

- [ ] **`try-catch`** blocks are used in critical Page & Action methods (data retrieval, complex interactions)
- [ ] Error messages are **meaningful and descriptive** — include context about what failed
- [ ] Errors are **properly propagated** — re-throw with `new Error(...)`, don't silently swallow
- [ ] Failed tests automatically capture **screenshots** (configured in `playwright.config.ts`) and **traces** on first retry

```typescript
// ✅ Correct — meaningful error with context
catch (error) {
    throw new Error(`Failed to get total request count: ${error instanceof Error ? error.message : error}`)
}

// ❌ Wrong — swallowed error, no context
catch (error) {
    console.log(error)
}
```

### 4. Test Independence

- [ ] Each test can **run in any order** — no dependencies between test cases
- [ ] **`test.beforeEach`** handles all setup (navigate, login, prepare state)
- [ ] **`test.afterEach`** handles cleanup (navigate to `/`, reset state)
- [ ] **No shared mutable state** between tests — each test gets its own fixture instances

```typescript
// ✅ Correct — proper setup/cleanup
test.beforeEach(async ({ login, commonPage }) => {
    await commonPage.navigation.visit("/")
    await login.loginTimesheetSystem(USER.MANAGER.USER_NAME, USER.MANAGER.PASSWORD)
})
test.afterEach(async ({ commonPage }) => {
    await commonPage.navigation.visit('/')
})
```

### 5. Assertions

- [ ] Tests have **sufficient assertions** to verify the expected behavior
- [ ] All `expect()` calls include a **clear, custom message** explaining what is being verified
- [ ] Assertions test **the right things** — verify outcomes, not implementation details
- [ ] **No redundant assertions** — each assertion validates a distinct requirement

```typescript
// ✅ Correct — descriptive assertion message
expect(title).toBe("Confirm request", "Confirm request page title should be displayed")

// ❌ Wrong — no message
expect(title).toBe("Confirm request")
```

### 6. Code Quality

- [ ] **No code duplication** — repeated logic is extracted into `private` helper methods
- [ ] **DRY principle** — use inherited composition properties directly (e.g. `this.navigation.selectNavigationBar()`), don't create wrapper methods
- [ ] **SOLID principles** applied — single responsibility per class, pages don't contain assertions, actions don't define locators
- [ ] Variable and function names are **clear and self-documenting**
- [ ] **Complex logic is commented** — explain the *why*, not the *what*
- [ ] All public Action methods have **JSDoc comments**

### 7. Performance

- [ ] Selectors are **efficient** — use IDs, roles, or data-testid over complex CSS/XPath chains
- [ ] **No unnecessary waits** — rely on Playwright auto-waiting wherever possible
- [ ] Tests are **parallel execution ready** — no test depends on another test's side effects
- [ ] **No memory leaks** — clean up event listeners, avoid unbounded data accumulation

### 8. Maintainability

- [ ] Code is **easy to understand** for a new team member
- [ ] Code is **easy to modify** — adding a new test or page only requires following the [Adding a New Feature](#adding-a-new-feature) pattern
- [ ] Components are **reusable** — shared UI behavior lives in `pages/extends/` (e.g. `Navigation`, `Popup`)
- [ ] **Documentation exists** where needed — JSDoc on all public Action methods, comments on complex logic

---

## Adding a New Feature

When adding tests for a new page (e.g., **"My Leave"**), follow these steps in order:

| Step | Layer | File to Create / Update |
|---|---|---|
| 1 | **Page** | `tests/pages/my-leave.page.ts` — extend `CommonPage`, add locators |
| 2 | **Action** | `tests/actions/my-leave.action.ts` — extend `MyLeavePage`, add business methods with JSDoc |
| 3 | **Constants** | `tests/data/constants/my-leave.const.ts` — add frozen constant object |
| 4 | **Test Data** | `tests/data/testdata/my-leave.testdata.ts` — add test data if needed |
| 5 | **Fixture** | Update `tests/fixtures/base-fixture.ts` — add new Action to `FixturesDefine` type |
| 6 | **Spec** | `tests/specs/timesheet/my-leave.spec.ts` — write test scenarios using fixtures |

---

## Available Scripts

| Command | Description |
|---|---|
| `npm test` | Run all tests in headless mode |
| `npm run test:headed` | Run tests with browser UI visible |
| `npm run test:ui` | Open Playwright UI mode (interactive) |
| `npm run test:debug` | Run tests in debug mode |

---

## Configuration Reference

| File | Key Settings |
|---|---|
| `playwright.config.ts` | Base URL, browsers (Chromium, Firefox, WebKit), parallel execution, trace on retry, screenshot on failure |
| `tsconfig.json` | ES2022 target, CommonJS module, strict mode, path aliases (`@pages/*`, `@actions/*`, `@data/*`, `@fixtures/*`) |
| `.env` | `MANAGER_USERNAME`, `MANAGER_PASSWORD` — **never commit this file** |
