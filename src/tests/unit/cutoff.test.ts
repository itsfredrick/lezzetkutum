import { describe, it, expect } from 'vitest';
import { CutoffService } from '../../lib/services/cutoff-service';
import { addDays, subDays } from 'date-fns';

describe('CutoffService', () => {
    it('should be editable if now is before cutoff', () => {
        const cutoff = addDays(new Date(), 1);
        expect(CutoffService.isWeekEditable(cutoff)).toBe(true);
    });

    it('should be locked if now is after cutoff', () => {
        const cutoff = subDays(new Date(), 1);
        expect(CutoffService.isWeekEditable(cutoff)).toBe(false);
    });

    it('should calculate cutoff as 4 days prior', () => {
        const delivery = new Date('2025-01-10T12:00:00'); // Use explicit time to avoid midnight shifts
        const result = CutoffService.calculateCutoff(delivery);

        // Expected: 2025-01-06 at 00:00:00 Local Time (as setHours(0,0,0,0) uses local)
        // To verify logic without timezone pain, check the difference in days approx or reset expected similarly

        const expected = new Date(delivery);
        expected.setHours(0, 0, 0, 0);
        expected.setDate(expected.getDate() - 4);

        expect(result.getTime()).toEqual(expected.getTime());
    });
});
