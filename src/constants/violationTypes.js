export const ViolationType = {
    GRAVE: 0,
    MEDIA: 1,
    BAIXA: 2,
    GRAVISSIMA: 3
};

/**
 * Get the violation type name from the enum value
 * @param {number} value - The enum value
 * @returns {string} The violation type name
 */
export function getViolationTypeName(value) {
    const types = {
        0: 'Grave',
        1: 'Média',
        2: 'Baixa',
        3: 'Gravíssima'
    };
    return types[value] || 'Desconhecido';
}

/**
 * Get all violation types as array
 * @returns {Array} Array of violation types
 */
export function getAllViolationTypes() {
    return [
        { value: ViolationType.GRAVE, label: 'Grave' },
        { value: ViolationType.MEDIA, label: 'Média' },
        { value: ViolationType.BAIXA, label: 'Baixa' },
        { value: ViolationType.GRAVISSIMA, label: 'Gravíssima' }
    ];
}
