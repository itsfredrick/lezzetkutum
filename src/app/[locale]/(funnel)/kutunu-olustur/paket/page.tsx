import { getPlans } from "@/app/actions/plans";
import { PlanSelection } from "@/components/funnel/PlanSelection";

export default async function SelectPlanPage() {
    const plans = await getPlans();

    return <PlanSelection plans={plans} />;
}

