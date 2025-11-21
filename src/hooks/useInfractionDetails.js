import { useLocation } from "react-router-dom";

export function useInfractionDetails() {
    const location = useLocation();
    const infraction = location.state?.infraction;

    return { infraction };
}