# Gap Backlog

## Blocker / Major
- [ ] **Admin Dashboard & Features**: Almost entirely missing. Need recipes, menus, orders management.
- [ ] **Auth Integration**: Login/Register pages exist but need clear NextAuth (or Clerk/Supabase) wire-up confirmation.
- [ ] **Account Pages**: `subscription` and `support` routes missing in Account section.
- [ ] **Public Pages**: `how-it-works`, `plans-pricing` missing. `menu` and `recipes` need verification they are DB-backed.
- [ ] **Cutoff Logic**: "Real" cutoff logic mentioned in prompt (function + UI lock) needs explicit implementation.
- [ ] **Recipe Validator**: Admin-side validator for "Ingredient Correctness" missing.
- [ ] **Order Timeline**: Visualization of `OrderEvent`s in Account/Admin.

## Minor
- [ ] **Legal Pages**: Check `cookies` and `distance-sales-info`.
- [ ] **SEO/JSON-LD**: Add structured data to Recipe pages.
- [ ] **Tests**: E2E tests excluded from build, need to be fixed and passing.
