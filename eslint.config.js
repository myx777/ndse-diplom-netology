module.exports = {
    env: {
        node: true,
        commonjs: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended', // Для интеграции с Prettier
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'prettier/prettier': 'error', // Правила для Prettier
        'no-console': 'warn', // Предупреждения для использования console.log
        'no-unused-vars': 'warn', // Предупреждения для неиспользуемых переменных
        'eqeqeq': 'error', // Использование === вместо ==
        'curly': 'error', // Обязательное использование фигурных скобок в блоках
        'quotes': ['error', 'single'], // Использование одинарных кавычек
        'semi': ['error', 'always'], // Обязательное использование точек с запятой
        'indent': ['error', 2], // Отступы в 2 пробела
        'comma-dangle': ['error', 'always-multiline'], // Запятая в последнем элементе многострочного объекта или массива
        'no-trailing-spaces': 'error', // Запрет на завершающие пробелы
    },
};
