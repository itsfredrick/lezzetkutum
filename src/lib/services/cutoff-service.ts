
import { addDays } from "date-fns";

/**
 * Service to handle business logic regarding cutoff dates and locking.
 */
export const CutoffService = {
    /**
     * Determines if a Menu Week is currently editable by the user.
     * Logic: Week is editable if current time is before the cutoff date.
     * @param cutoffDate The cutoff date of the menu week.
     * @param now Current time (optional, defaults to Date.now())
     */
    isWeekEditable: (cutoffDate: Date, now: Date = new Date()) => {
        return now < cutoffDate;
    },

    /**
     * Calculates the cutoff date for a given delivery date.
     * Policy: Cutoff is 4 days before delivery at midnight.
     * @param deliveryDate 
     */
    calculateCutoff: (deliveryDate: Date) => {
        const d = new Date(deliveryDate);
        d.setHours(0, 0, 0, 0);
        return addDays(d, -4);
    },

    /**
     * Returns remaining time in milliseconds if editable, 0 if locked.
     */
    getTimeRemaining: (cutoffDate: Date, now: Date = new Date()) => {
        const diff = cutoffDate.getTime() - now.getTime();
        return Math.max(0, diff);
    }
};
