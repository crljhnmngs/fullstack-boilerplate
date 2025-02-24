const Configuration = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat', // New Features
                'fix', // Bug fixes
                'chore', // Maintenance Task
                'ci', // CI configuration changes
                'docs', // Documentation updates
                'perf', // Performance improvements
                'refactor', // Code refactoring
                'revert', // Revert to previous commit
                'style', // Code style changes
                'test', // Adding or updating tests
            ],
        ],
        'scope-enum': [
            2,
            'always',
            ['FE', 'BE', 'common'], // Frontend, Backend, or Common
        ],
        'scope-empty': [2, 'never'], // Scope is now REQUIRED
        'scope-case': [2, 'always', 'kebab-case'], // Scope should be in kebab-case (e.g., FE-cart)
        'subject-case': [2, 'always', 'lower-case'],
    },
};

module.exports = Configuration;
