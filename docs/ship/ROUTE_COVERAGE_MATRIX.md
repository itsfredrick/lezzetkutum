# Route Coverage Matrix

| Route | Status | Data Source | Responsive | States (Load/Err/Empty) | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **PUBLIC** | | | | | |
| `/` | COMPLETE | DB (Featured) | YES | YES | Fetches featured recipes from DB. |
| `/how-it-works` | MISSING | - | - | - | Needs implementation. |
| `/plans-pricing` | MISSING | - | - | - | Needs implementation. |
| `/menu` | PARTIAL | - | - | - | Folder exists, need to verify content. |
| `/recipes` | PARTIAL | - | - | - | Folder exists, need to verify content. |
| `/recipes/[slug]` | PARTIAL | - | - | - | Folder exists, need to verify content. |
| `/faq` | PARTIAL | Mock/Static | YES | - | Exists, check if using DB. |
| `/about` | PARTIAL | Static | YES | - | Exists. |
| `/legal/terms` | PARTIAL | Static | YES | - | Exists. |
| `/legal/privacy-kvkk` | PARTIAL | Static | YES | - | Exists. |
| `/legal/*` | PARTIAL | Static | YES | - | Cookies/Distance Sales need verification. |
| **FUNNEL** | | | | | |
| `/select-plan` | COMPLETE | DB | YES | YES | Uses `getPlans`. |
| `/select-recipes` | COMPLETE | DB | YES | YES | Uses `getCurrentMenuWeek`. |
| `/delivery-schedule` | COMPLETE | DB (Form) | YES | YES | Submits to Checkout. |
| `/checkout` | COMPLETE | DB (Action) | YES | YES | Creates Order in DB. |
| `/order-confirmed` | PARTIAL | - | - | - | Need to verify if it reads real order ID. |
| **AUTH** | | | | | |
| `/auth/login` | PARTIAL | - | - | - | Folder exists. |
| `/auth/register` | PARTIAL | - | - | - | Folder exists. |
| **ACCOUNT** | | | | | |
| `/account` (Overview) | PARTIAL | - | - | - | `page.tsx` exists. |
| `/account/next-box` | PARTIAL | - | - | - | Folder exists. |
| `/account/orders` | PARTIAL | - | - | - | Folder exists. |
| `/account/orders/[id]` | MISSING | - | - | - | Need to verify. |
| `/account/subscription` | MISSING | - | - | - | Missing folder? Checked `account` dir, didn't see it. |
| `/account/addresses` | PARTIAL | - | - | - | Folder exists. |
| `/account/payments` | PARTIAL | - | - | - | Folder exists. |
| `/account/credits` | PARTIAL | - | - | - | Folder exists. |
| `/account/support` | MISSING | - | - | - | Checked `account` dir, didn't see it. |
| **ADMIN** | | | | | |
| `/admin/dashboard` | MISSING | - | - | - | Only `support` folder seen in `admin`. |
| `/admin/menus` | MISSING | - | - | - | |
| `/admin/recipes` | MISSING | - | - | - | |
| `/admin/orders` | MISSING | - | - | - | |
| `/admin/promotions` | MISSING | - | - | - | |
| `/admin/support` | PARTIAL | - | - | - | Folder exists. |
| `/admin/settings` | MISSING | - | - | - | |
