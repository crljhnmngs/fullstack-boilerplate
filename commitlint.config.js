const customSubjectCaseRule = (parsed, when) => {
    console.log('heres');
    const input = parsed.subject;
    if (!input) {
        return [true];
    }

    const firstChar = input.charAt(0);
    const rest = input.slice(1);

    const isFirstCharLowerCase = firstChar === firstChar.toLowerCase();
    const isRestUpperCase = rest === rest.toUpperCase();

    const result = isFirstCharLowerCase && isRestUpperCase;
    return [
        result,
        `subject must start with a lowercase letter. Found: "${input}"`,
    ];
};

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
        'scope-empty': [2, 'never'], // Scope is REQUIRED
        'subject-case': [2, 'always', customSubjectCaseRule],
    },
};

module.exports = Configuration;
