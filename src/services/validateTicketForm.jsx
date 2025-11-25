/**
 * Validate ticket form data
 * @param {Object} formData - The ticket form data
 * @returns {string|null} Error message or null if valid
 */
export function validateTicket(formData) {
    if (!formData.model?.trim()) {
        return "Model is required.";
    }

    if (formData.model.length < 2) {
        return "Model must be at least 2 characters long.";
    }

    if (formData.type === undefined || formData.type === null || formData.type === "") {
        return "Violation type is required.";
    }

    const violationType = parseInt(formData.type);
    if (isNaN(violationType) || violationType < 0 || violationType > 3) {
        return "Invalid violation type. Must be between 0 and 3.";
    }

    if (formData.dateTime && !isValidDateTime(formData.dateTime)) {
        return "Invalid date/time format.";
    }

    if (formData.description && formData.description.length < 5) {
        return "Description must be at least 5 characters long.";
    }

    return null;
}

/**
 * Check if date/time string is valid
 * @param {string} dateTime - The date/time string
 * @returns {boolean} True if valid
 */
function isValidDateTime(dateTime) {
    if (!dateTime || typeof dateTime !== 'string') {
        return false;
    }

    const date = new Date(dateTime);
    return date instanceof Date && !isNaN(date);
}

/**
 * Validate violation type
 * @param {number} type - The violation type
 * @returns {boolean} True if valid
 */
export function isValidViolationType(type) {
    return Number.isInteger(type) && type >= 0 && type <= 3;
}
