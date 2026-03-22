## Do Things the Laravel Way

- Use `php artisan make:` commands to create new files (i.e. migrations, controllers, models, etc.). You can list
  available Artisan commands using the `list-artisan-commands` tool.
- If you're creating a generic PHP class, use `artisan make:class`.
- Pass `--no-interaction` to all Artisan commands to ensure they work without user input. You should also pass the
  correct `--options` to ensure correct behaviour.

### Installing Dependencies (inside DDEV)

- Use Composer and npm to manage PHP and Node.js dependencies respectively.
- All commands must be run inside the DDEV container. Always prefix commands with `ddev`.

Examples:

- PHP dependencies
    - `ddev composer install`
    - Install Inertia adapter (preferred, do not edit composer.json manually):
      `ddev composer require inertiajs/inertia-laravel:^1.0`
    - Update a specific package (when required): `ddev composer update <package>` (e.g.,
      `ddev composer update inertiajs/inertia-laravel`)

- Node.js dependencies and assets
    - `ddev npm install`
    - Start Vite dev server: `ddev npm run dev`
    - Build assets: `ddev npm run build`

- Common Laravel commands (run inside DDEV)
    - Generate app key: `ddev artisan key:generate`
    - Run migrations: `ddev artisan migrate --force`
    - Serve the app locally: `ddev artisan serve`

### Language & Style

- Use British English spelling for all documentation, code comments, commit messages, and user-facing text (e.g.,
  behaviour, authorisation, initialise, serialise).
- Follow existing project tone and conventions.

### Database

- Always use proper Eloquent relationship methods with return type hints. Prefer relationship methods over raw queries
  or manual joins.
- Use Eloquent models and relationships before suggesting raw database queries
- Avoid `DB::`; prefer `Model::query()`. Generate code that leverages Laravel's ORM capabilities rather than bypassing
  them.
- Generate code that prevents N+1 query problems by using eager loading.
- Use Laravel's query builder for very complex database operations.

### Model Creation

- When creating new models, create useful factories and seeders for them too. Ask the user if they need any other
  things, using `list-artisan-commands` to check the available options to `php artisan make:model`.

### APIs & Eloquent Resources

- For APIs, default to using Eloquent API Resources and API versioning unless existing API routes do not, then you
  should follow existing application convention.

### Controllers & Validation

- Always create Form Request classes for validation rather than inline validation in controllers. Include both
  validation rules and custom error messages.
- Check sibling Form Requests to see if the application uses array or string based validation rules.

### Queues

- Use queued jobs for time-consuming operations with the `ShouldQueue` interface.

### Authentication & Authorisation

- Use Laravel's built-in authentication and authorisation features (gates, policies, Sanctum, etc.).

### URL Generation

- When generating links to other pages, prefer named routes and the `route()` function.

### Configuration

- Use environment variables only in configuration files - never use the `env()` function directly outside of config
  files. Always use `config('app.name')`, not `env('APP_NAME')`.

### Testing

- When creating models for tests, use the factories for the models. Check if the factory has custom states that can be
  used before manually setting up the model.
- Faker: Use methods such as `$this->faker->word()` or `fake()->randomDigit()`. Follow existing conventions whether to
  use `$this->faker` or `fake()`.
- When creating tests, make use of `php artisan make:test [options] <name>` to create a feature test, and pass `--unit`
  to create a unit test. Most tests should be feature tests.

### Vite Error

- If you receive an "Illuminate\Foundation\ViteException: Unable to locate file in Vite manifest" error, you can run
  `npm run build` or ask the user to run `npm run dev` or `composer run dev`.

### TypeScript Guidelines

You are a senior TypeScript programmer with a preference for clean programming and design patterns.

Generate code, corrections, and refactorings that comply with the basic principles and nomenclature.

## TypeScript General Guidelines

### Basic Principles

- Use English for all code and documentation.
- Always declare the type of each variable and function (parameters and return value).
    - Avoid using any.
    - Create necessary types.
- Use JSDoc to document public classes and methods.
- Don't leave blank lines within a function.
- One export per file.

### Nomenclature

- Use PascalCase for classes.
- Use camelCase for variables, functions, and methods.
- Use kebab-case for file and directory names.
- Use UPPERCASE for environment variables.
    - Avoid magic numbers and define constants.
- Start each function with a verb.
- Use verbs for boolean variables. Example: isLoading, hasError, canDelete, etc.
- Use complete words instead of abbreviations and correct spelling.
    - Except for standard abbreviations like API, URL, etc.
    - Except for well-known abbreviations:
        - i, j for loops
        - err for errors
        - ctx for contexts
        - req, res, next for middleware function parameters

### Functions

- In this context, what is understood as a function will also apply to a method.
- Write short functions with a single purpose. Less than 20 instructions.
- Name functions with a verb and something else.
    - If it returns a boolean, use isX or hasX, canX, etc.
    - If it doesn't return anything, use executeX or saveX, etc.
- Avoid nesting blocks by:
    - Early checks and returns.
    - Extraction to utility functions.
- Use higher-order functions (map, filter, reduce, etc.) to avoid function nesting.
    - Use arrow functions for simple functions (less than 3 instructions).
    - Use named functions for non-simple functions.
- Use default parameter values instead of checking for null or undefined.
- Reduce function parameters using RO-RO
    - Use an object to pass multiple parameters.
    - Use an object to return results.
    - Declare necessary types for input arguments and output.
- Use a single level of abstraction.

### Data

- Don't abuse primitive types and encapsulate data in composite types.
- Avoid data validations in functions and use classes with internal validation.
- Prefer immutability for data.
    - Use readonly for data that doesn't change.
    - Use as const for literals that don't change.

### Classes

- Follow SOLID principles.
- Prefer composition over inheritance.
- Declare interfaces to define contracts.
- Write small classes with a single purpose.
    - Less than 200 instructions.
    - Less than 10 public methods.
    - Less than 10 properties.

### Exceptions

- Use exceptions to handle errors you don't expect.
- If you catch an exception, it should be to:
    - Fix an expected problem.
    - Add context.
    - Otherwise, use a global handler.

### Testing

- Follow the Arrange-Act-Assert convention for tests.
- Name test variables clearly.
    - Follow the convention: inputX, mockX, actualX, expectedX, etc.
- Write unit tests for each public function.
    - Use test doubles to simulate dependencies.
        - Except for third-party dependencies that are not expensive to execute.
- Write acceptance tests for each module.
    - Follow the Given-When-Then convention.
