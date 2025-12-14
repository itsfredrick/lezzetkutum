# Route Coverage Matrix

Maps application routes to screens and required components.

| Route | Screen / Description | Required Components | States Needed | Status |
|---|---|---|---|---|
| `/` | Home | Hero, HowItWorks(Steps), FeaturedMenu(RecipeCard), PricingTeaser, FAQ | Default, Loading | Implemented |
| `/how-it-works` | How It Works | StepsIllustration, BoxContent, CutoffInfo | Default | Pending |
| `/plans-pricing` | Plans & Pricing | PlanConfigurator, PriceBreakdown, ComparisonTable | Default, Interactive | Pending |
| `/menu` | Menu | WeekSelector, Collections(Tabs), FilterChips, RecipeGrid, RecipeCard | Default, Locked(Post-Cutoff) | Implemented |
| `/recipes` | Recipes Library | SearchBar, CategoryList, RecipeGrid | Default, Searching, Empty | Implemented |
| `/recipes/[slug]` | Recipe Detail | RecipeHero, IngredientsList, NutritionBadges, StepByStep, CookMode | Default, CookMode | Implemented |
| `/select-plan` | Funnel: Plan | Stepper(1/4), PlanSelector, StickySummary | Default, SelectionActive | Implemented |
| `/select-recipes` | Funnel: Recipes | Stepper(2/4), ReceipeGrid(Selectable), SelectedDrawer, ChefChoice | Default, SelectionFull, Locked | Implemented |
| `/delivery-schedule` | Funnel: Delivery | Stepper(3/4), AddressForm, ZoneValidator, TimeSelector | Default, ZoneError, ZoneSuccess | Implemented |
| `/checkout` | Funnel: Checkout | Stepper(4/4), PaymentForm, OrderSummary, Agreements | Default, Processing, Success | Implemented |
| `/order-confirmed` | Confirmation | SuccessHero, OrderDetails, EstimatedDelivery | Success | Implemented |
| `/account/overview` | Account: Overview | NextBoxCard, PastOrdersList | Default, Loading | Pending |
| `/account/next-box` | Account: Next Box | MealList(Editable), SkipButton | Default, Locked | Pending |
| `/account/orders` | Account: Orders | OrderList | Default, Empty | Pending |
| `/account/orders/[id]`| Account: Order Detail| OrderItems, Invoice | Default | Pending |
| `/account/subscription`| Account: Settings | PlanSettings, PauseAction, CancelAction | Default | Pending |
| `/admin/menus` | Admin: Menus | WeekCalendar, MenuEditor, PublishToggle | Default | Pending |
| `/admin/recipes` | Admin: Recipes | RecipeList, RecipeEditor | Default | Pending |
