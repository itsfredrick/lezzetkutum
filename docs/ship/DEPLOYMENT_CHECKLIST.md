# Deployment Checklist

- [x] Build passes locally (`npm run build`).
- [x] Database URL configured via `.env`.
- [x] Prisma Client generated during build (`package.json` script).
- [ ] Typecheck passes without exclusions (currently `src/tests` excluded).
- [ ] E2E Tests pass (`npx playwright test`).
- [ ] All routes have valid SEO metadata.
- [ ] No hardcoded secrets in client bundles.
