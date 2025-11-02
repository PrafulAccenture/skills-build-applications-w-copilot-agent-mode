# GitHub Copilot Instructions for OctoFit Tracker

## Security Guidelines

- **Focus on security and avoid unsafe string interpolation**: Always use parameterized queries, prepared statements, or ORM methods to prevent SQL injection and other injection attacks. Never concatenate user input directly into queries or commands.
- **Validate and sanitize all user inputs**: Ensure all data received from users is validated against expected formats and sanitized before processing.
- **Use environment variables for sensitive data**: Never hardcode API keys, passwords, database credentials, or other secrets. Always use environment variables or secure configuration management.
- **Implement proper authentication and authorization**: Verify user permissions before allowing access to resources or performing sensitive operations.
- **Apply CORS policies carefully**: Configure CORS headers appropriately to prevent unauthorized cross-origin requests.
- **Keep dependencies updated**: Regularly update packages to patch known security vulnerabilities.
- **Use HTTPS for all communications**: Ensure all API endpoints and frontend communications use secure protocols.

## Code Quality and Documentation

- **Ensure functions have docstrings explaining parameters and return types**: All functions should include clear docstrings that describe:
  - What the function does
  - Parameters with their types and purpose
  - Return values with their types
  - Any exceptions that might be raised
  - Usage examples for complex functions
- **Write descriptive variable and function names**: Use clear, self-explanatory names that convey purpose and intent.
- **Follow language-specific style guides**: 
  - Python: Follow PEP 8 conventions
  - JavaScript/React: Follow Airbnb style guide or similar
- **Add inline comments for complex logic**: Explain the "why" behind non-obvious implementation decisions.
- **Keep functions focused and small**: Each function should do one thing well (Single Responsibility Principle).

## Django Backend Specific Rules

- **Use Django's ORM**: Always use Django's ORM for database operations instead of raw SQL queries.
- **Follow Django best practices**:
  - Use Django's built-in authentication system
  - Leverage Django REST Framework serializers for data validation
  - Use Django's middleware for cross-cutting concerns
  - Implement proper model validation in `clean()` methods
- **Error handling**: Use try-except blocks with specific exception types and provide meaningful error messages.
- **Logging**: Implement proper logging for debugging and monitoring purposes.

## React Frontend Specific Rules

- **Component structure**: Create reusable, composable components with clear prop types.
- **State management**: Use appropriate state management (useState, useContext, or Redux) based on complexity.
- **Error boundaries**: Implement error boundaries to gracefully handle component errors.
- **Accessibility**: Ensure all interactive elements are keyboard accessible and have appropriate ARIA labels.
- **Performance**: Use React.memo, useMemo, and useCallback to optimize rendering when appropriate.

## Testing Guidelines

- **Write unit tests**: Ensure critical functions have corresponding unit tests.
- **Test edge cases**: Consider boundary conditions, null values, and error scenarios.
- **Mock external dependencies**: Use mocks for external APIs, databases, and services in tests.

## Project Structure Guidelines

- **Never change directories when running commands**: Point to the directory when issuing commands instead of using `cd`.
- **Use virtual environments**: Always activate the Python virtual environment before running Python commands.
- **Follow the established project structure**: Maintain the octofit-tracker/backend and octofit-tracker/frontend separation.

## MongoDB and Database Rules

- **Use Django's ORM**: Always use Django's ORM for database operations, not direct MongoDB scripts.
- **Validate data at model level**: Implement validation in Django models before saving to the database.
- **Handle database connection errors**: Implement proper error handling for database connectivity issues.

## Git and Version Control

- **Write clear commit messages**: Use descriptive commit messages that explain what and why.
- **Keep commits focused**: Each commit should represent a single logical change.
- **Review before committing**: Check for debugging code, commented-out code, or sensitive information before committing.
