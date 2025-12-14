import { getCurrentMenuWeek } from "@/app/actions/recipes";
import { RecipeSelection } from "@/components/funnel/RecipeSelection";

export default async function SelectRecipesPage() {
    const menuWeek = await getCurrentMenuWeek();

    return <RecipeSelection menuWeek={menuWeek} />;
}
