import { getCurrentMenuWeek } from "@/app/actions/recipes";
import { DeliveryScheduleForm } from "@/components/funnel/DeliveryScheduleForm";

export default async function DeliverySchedulePage() {
    const menuWeek = await getCurrentMenuWeek();

    return <DeliveryScheduleForm menuWeek={menuWeek} />;
}
