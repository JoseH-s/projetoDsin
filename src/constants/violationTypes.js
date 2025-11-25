export const ViolationType = {
    SPEEDING: 0,
    PARKING: 1,
    RED_LIGHT: 2,
    ILLEGAL_LANE_CHANGE: 3
};

/**
 * Get the violation type name from the enum value
 * @param {number} value - The enum value
 * @returns {string} The violation type name
 */
export function getViolationTypeName(value) {
    const types = {
        0: 'Excesso de Velocidade',
        1: 'Estacionamento Irregular',
        2: 'Avanço de Sinal Vermelho',
        3: 'Mudança Ilegal de Faixa'
    };
    return types[value] || 'Desconhecido';
}

/**
 * Get all violation types as array
 * @returns {Array} Array of violation types
 */
export function getAllViolationTypes() {
    return [
        { value: ViolationType.SPEEDING, label: 'Excesso de Velocidade' },
        { value: ViolationType.PARKING, label: 'Estacionamento Irregular' },
        { value: ViolationType.RED_LIGHT, label: 'Avanço de Sinal Vermelho' },
        { value: ViolationType.ILLEGAL_LANE_CHANGE, label: 'Mudança Ilegal de Faixa' }
    ];
}
