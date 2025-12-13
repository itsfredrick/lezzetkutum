# Design Inventory

Based on the prompt requirements and uploaded assets.

## A) Marketing / Public

| Screen Name | Route | Breakpoints | Key UI Sections | Status |
|---|---|---|---|---|
| Home | `/` | Mob, Tab, Desk | Hero (value, eligibility), How It Works (3-step), Featured Menu (6 cards), Pricing Teaser, Trust/Benefits, FAQ, Footer CTA | Defined |
| How It Works | `/how-it-works` | Mob, Tab, Desk | Steps Illustration, "What's in the box", Cutoff Timeline, CTA | Defined |
| Plans & Pricing | `/plans-pricing` | Mob, Tab, Desk | Plan Configurator (people/meals), Price Breakdown, Comparison Table, FAQ | Defined |
| Menu | `/menu` | Mob, Tab, Desk | Week Selector, Collections (5 tabs), Filters, Recipe Grid, Cutoff Countdown, Locked State | Defined |
| Recipes Library | `/recipes` | Mob, Tab, Desk | Search, Categories, Trending, List/Grid | Defined |
| Recipe Detail | `/recipes/[slug]` | Mob, Tab, Desk | Hero, Ingredients, Allergens, Steps, "Cook Mode" | Defined |
| Static Pages | `/faq`, `/about`, `/legal` | Mob, Tab, Desk | Text content, Sidebar navigation (Desktop) | Defined |

## B) Funnel

| Screen Name | Route | Breakpoints | Key UI Sections | Status |
|---|---|---|---|---|
| Select Plan | `/select-plan` | Mob, Tab, Desk | Stepper (1/4), Plan Selector, Sticky Summary | Defined |
| Select Recipes | `/select-recipes` | Mob, Tab, Desk | Stepper (2/4), Selected Count, Recipe Grid (Select/Swap), Sticky Drawer, Chef's Choice | Defined |
| Delivery Details | `/delivery-schedule` | Mob, Tab, Desk | Stepper (3/4), Address Form (Zone validation), Date/Time Selector | Defined |
| Checkout | `/checkout` | Mob, Tab, Desk | Stepper (4/4), Contact, Payment (Mock 3DS), Promo Code, Order Summary, Legal Checkboxes | Defined |
| Order Confirmed | `/order-confirmed` | Mob, Tab, Desk | Confirmation Msg, Delivery Info, Cutoff Reminder, CTAs | Defined |

## C) Account

| Screen Name | Route | Breakpoints | Key UI Sections | Status |
|---|---|---|---|---|
| Overview | `/account/overview` | Mob, Tab, Desk | Next Box Card, Past Orders Preview | Defined |
| Next Box | `/account/next-box` | Mob, Tab, Desk | Meal List (Swap/Skip), Locked State | Defined |
| Orders | `/account/orders` | Mob, Tab, Desk | Order List, Status Chips | Defined |
| Order Detail | `/account/orders/[id]` | Mob, Tab, Desk | Items, Receipt, "Report Issue" | Defined |
| Subscription | `/account/subscription` | Mob, Tab, Desk | Change Plan, Pause/Resume, Cancel | Defined |
| Addresses | `/account/addresses` | Mob, Tab, Desk | List, Add/Edit | Defined |
| Payments | `/account/payments` | Mob, Tab, Desk | Saved Cards, Add/Delete | Defined |
| Credits | `/account/credits` | Mob, Tab, Desk | Balance, History | Defined |
| Support | `/account/support` | Mob, Tab, Desk | Contact Info, Issue Form, Ticket List | Defined |

## D) Admin

| Screen Name | Route | Breakpoints | Key UI Sections | Status |
|---|---|---|---|---|
| Dashboard | `/admin/dashboard` | Desktop | KPIs (Orders, Rev), Quick Links | Defined |
| Menus | `/admin/menus` | Desktop | Week Calendar, Publish/Lock, Audit | Defined |
| Recipe CMS | `/admin/recipes` | Desktop | List, Editor (Meta, Img, Steps), Versioning | Defined |
| Orders | `/admin/orders` | Desktop | Search, Detail, Status, Refund | Defined |
| Promotions | `/admin/promotions` | Desktop | Coupon Creator, Usage | Defined |
| Support | `/admin/support` | Desktop | Ticket Queue, Respond | Defined |
| Settings | `/admin/settings` | Desktop | Config, Users | Defined |
