const Configuration = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat',
                'fix',
                'chore',
                'ci',
                'docs',
                'perf',
                'refactor',
                'revert',
                'style',
                'test',
            ],
        ],
        'scope-enum': [2, 'always', ['FE', 'BE', 'common']],
        'scope-empty': [2, 'never'],
        'subject-empty': [2, 'never'],
    },
};

module.exports = Configuration;
