import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { axiosInstance } from '../routes/index';

const TicketsContext = createContext();

export function TicketsProvider({ children }) {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadTickets() {
            try {
                const response = await axiosInstance.get('/api/Ticket');
                console.log("Tickets received:", response.data);
                setTickets(response.data);
            } catch (error) {
                console.error("Error fetching tickets:", error);
            } finally {
                setLoading(false);
            }
        }

        loadTickets();
    }, []);

    async function addTicket(ticket) {
        try {
            const payload = {
                brand: ticket.brand || "",
                model: ticket.model,
                violationLocation: ticket.violationLocation || "",
                reference: ticket.reference || "",
                dateTime: ticket.dateTime || "",
                state: ticket.state || "",
                city: ticket.city || "",
                description: ticket.description || "",
                color: ticket.color || "",
                type: parseInt(ticket.type)
            };

            console.log("Sending payload to API:", payload);

            const response = await axiosInstance.post('/api/Ticket', payload);

            setTickets(prev => [response.data, ...prev]);

            console.log("Ticket added successfully:", response.data);
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error(
                    "Error adding ticket:",
                    "Status:", error.response.status,
                    "Data:", error.response.data
                );
            } else {
                console.error("Error adding ticket:", error.message);
            }
            throw error;
        }
    }

    async function updateTicket(id, ticketData) {
        try {
            const response = await axiosInstance.put(`/api/Ticket/${id}`, ticketData);
            setTickets(prev => prev.map(t => t.id === id ? response.data : t));
            console.log("Ticket updated successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error updating ticket:", error);
            throw error;
        }
    }

    async function deleteTicket(id) {
        try {
            await axiosInstance.delete(`/api/Ticket/${id}`);
            setTickets(prev => prev.filter(t => t.id !== id));
            console.log("Ticket deleted successfully");
        } catch (error) {
            console.error("Error deleting ticket:", error);
            throw error;
        }
    }

    return (
        <TicketsContext.Provider value={{
            tickets,
            loading,
            addTicket,
            updateTicket,
            deleteTicket,
        }}>
            {children}
        </TicketsContext.Provider>
    );
}

TicketsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export function useTickets() {
    const context = useContext(TicketsContext);
    if (!context) {
        throw new Error('useTickets must be used within TicketsProvider');
    }
    return context;
}
