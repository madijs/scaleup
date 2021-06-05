export const phoneFormat = (str) => {
    let cleaned = ('' + str).replace(/\D/g, '');

    let match = cleaned.match(/^(7|)?(\d{3})(\d{3})(\d{4})$/);

    if (match) {
        let intlCode = (match[1] ? '+7 ' : '');
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }

    return null;
};