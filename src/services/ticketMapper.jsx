import { processDate } from "./dateService";

/**
 * Map form data to Ticket structure
 * @param {Object} formData - The form data
 * @returns {Object} Ticket request object
 */
export function formToTicket(formData) {
    const processedDate = processDate(formData.dateTime);

    return {
        brand: formData.brand || "",
        model: formData.model || "",
        violationLocation: formData.violationLocation || "",
        reference: formData.reference || "",
        dateTime: processedDate || "",
        state: formData.state || "",
        city: formData.city || "",
        description: formData.description || "",
        color: formData.color || "",
        type: formData.type !== undefined ? parseInt(formData.type) : 0
    };
}/**
 * Map violation analysis response to Ticket structure
 * @param {Object} apiData - The API response data
 * @returns {Object} Ticket object
 */
export function violationAnalysisToTicket(apiData) {
    let violationType = 0;
    if (apiData.type !== undefined && apiData.type !== null) {
        const parsedType = parseInt(apiData.type);
        if (!isNaN(parsedType) && parsedType >= 0 && parsedType <= 3) {
            violationType = parsedType;
        }
    }

    return {
        brand: apiData.brand || "",
        model: apiData.model || "Unknown",
        violationLocation: apiData.violationLocation || "",
        reference: apiData.reference || "",
        dateTime: processDate(apiData.dateTime) || new Date().toISOString().split('.')[0],
        state: apiData.state || "",
        city: apiData.city || "",
        description: apiData.description || "",
        color: apiData.color || "",
        type: violationType
    };
}

/**
 * Map Ticket API response to display format
 * @param {Object} ticket - The ticket object from API
 * @returns {Object} Formatted ticket for display
 */
export function ticketToDisplay(ticket) {
    return {
        id: ticket.id,
        brand: ticket.brand || "N/A",
        model: ticket.model || "N/A",
        violationLocation: ticket.violationLocation || "N/A",
        reference: ticket.reference || "N/A",
        dateTime: ticket.dateTime,
        state: ticket.state || "N/A",
        city: ticket.city || "N/A",
        description: ticket.description || "No description",
        color: ticket.color || "N/A",
        type: ticket.type
    };
}
