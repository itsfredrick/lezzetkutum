import { getCurrentMenuWeek } from "@/app/actions/recipes";
import { CheckoutForm } from "@/components/funnel/CheckoutForm";

export default async function CheckoutPage() {
    const menuWeek = await getCurrentMenuWeek();

    return <CheckoutForm menuWeek={menuWeek} />;
}
