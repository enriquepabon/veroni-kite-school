# Security Audit Report

**Category:** Security
**Date:** 2026-03-12
**Project:** Veroni Kite School Website
**Tech Stack:** Next.js 14.2.35, React 18, TypeScript, Supabase, Wompi, Resend, Tailwind CSS
**Score: 5.2/10**

---

## Summary

| Severity | Count |
|----------|-------|
| CRITICAL | 1     |
| HIGH     | 3     |
| MEDIUM   | 5     |
| LOW      | 4     |
| **Total** | **13** |

---

## Checks Performed

1. Hardcoded Secrets
2. SQL Injection
3. XSS Vulnerabilities
4. Insecure Dependencies
5. Missing Input Validation

---

## Findings

### CHECK 1: Hardcoded Secrets

**Result: PASS (with minor gaps)**

No hardcoded API keys, passwords, or tokens found in source code. All sensitive values use `process.env.*`. `.env.local` is properly gitignored.

| # | Finding | Severity | File | Effort | Recommendation |
|---|---------|----------|------|--------|----------------|
| 1.1 | `.env` (bare) not in `.gitignore` | MEDIUM | `.gitignore:29` | S | Add `.env` to `.gitignore` to prevent accidental commits |
| 1.2 | `.mcp.json` not in `.gitignore` | LOW | `.gitignore` | S | Add `.mcp.json` to `.gitignore` as precaution |

---

### CHECK 2: SQL Injection

**Result: PASS**

No raw SQL queries found. All database operations use the Supabase JS client (`.from().select()`, `.insert()`, `.update()`), which parameterizes queries automatically. No string concatenation in database calls.

No findings.

---

### CHECK 3: XSS Vulnerabilities

**Result: PASS (with gaps in security hardening)**

React's JSX auto-escaping provides baseline XSS protection. `dangerouslySetInnerHTML` is only used with static, developer-controlled structured data (JSON-LD schemas). No user input flows into unsafe HTML rendering.

| # | Finding | Severity | File | Line | Effort | Recommendation |
|---|---------|----------|------|------|--------|----------------|
| 3.1 | Open redirect via `next` query param | HIGH | `src/app/auth/callback/route.ts` | 7, 18-22 | S | Validate `next` starts with `/` and not `//`. Use allowlist of paths |
| 3.2 | Missing Content-Security-Policy and security headers | MEDIUM | `next.config.mjs` | — | M | Add `headers()` config with CSP, X-Frame-Options, X-Content-Type-Options, HSTS, Referrer-Policy |
| 3.3 | No sanitization library in codebase | LOW | — | — | S | Add DOMPurify for future user-generated content rendering |

---

### CHECK 4: Insecure Dependencies

**Result: FAIL — 6 vulnerabilities (5 high, 1 moderate)**

| # | Package | Severity | CVE/Advisory | Detail | Effort | Recommendation |
|---|---------|----------|-------------|--------|--------|----------------|
| 4.1 | `next` 10.0.0–15.5.9 | HIGH | GHSA-9g9p-9gw9-jx7f | DoS via Image Optimizer remotePatterns | L | Upgrade to Next.js 16.x (breaking change) or apply mitigation |
| 4.2 | `next` 10.0.0–15.5.9 | HIGH | GHSA-h25m-26qc-wcjf | HTTP deserialization DoS with insecure RSC | L | Upgrade to Next.js 16.x |
| 4.3 | `glob` 10.2.0–10.4.5 | HIGH | GHSA-5j98-mcp5-4vw2 | Command injection via CLI --cmd flag | S | `npm audit fix --force` (updates eslint-config-next) |
| 4.4 | `minimatch` <=3.1.3 | HIGH | GHSA-3ppc-4f35-3m26 | ReDoS via repeated wildcards | S | `npm audit fix` |
| 4.5 | `minimatch` <=3.1.3 | HIGH | GHSA-7r86-cg39-jmmj | ReDoS via GLOBSTAR segments | S | `npm audit fix` |
| 4.6 | `ajv` <6.14.0 | MODERATE | GHSA-2g4f-4pwh-qvx6 | ReDoS with `$data` option | S | `npm audit fix` |

---

### CHECK 5: Missing Input Validation

**Result: FAIL — Multiple critical gaps**

| # | Finding | Severity | File | Line | Effort | Recommendation |
|---|---------|----------|------|------|--------|----------------|
| 5.1 | **Wompi webhook signature validation is optional** — if `WOMPI_EVENTS_SECRET` is unset or `signature` missing from payload, check is skipped entirely. Attacker can forge webhooks to mark bookings as paid | CRITICAL | `src/app/api/wompi/webhook/route.ts` | 22-49 | S | Make signature validation mandatory. Reject if secret unset or signature missing |
| 5.2 | No rate limiting on any endpoint | HIGH | All `src/app/api/*` routes | — | M | Add rate limiting middleware (e.g., `@upstash/ratelimit`). Prioritize `/api/booking`, `/api/leads` |
| 5.3 | No CSRF protection on state-changing endpoints | MEDIUM | All POST API routes | — | M | Add CSRF tokens or require custom header (`X-Requested-With`) |
| 5.4 | No CORS configuration | MEDIUM | `next.config.mjs`, `src/middleware.ts` | — | M | Add explicit CORS headers; restrict origins on webhook endpoint |
| 5.5 | No input length/type validation on API bodies — no max lengths on strings, no type checks on numeric fields (`amount_cop`), no UUID validation on IDs | MEDIUM | `src/app/api/bookings/route.ts`, `src/app/api/booking/route.ts`, `src/app/api/leads/route.ts`, `src/app/api/progress/route.ts` | Various | M | Add Zod schema validation for all request bodies |
| 5.6 | Race condition in booking slot availability check — check and update are not atomic, allowing overbooking | MEDIUM | `src/app/api/bookings/route.ts` | 28-76 | M | Use Supabase RPC with PostgreSQL transaction for atomic check-and-update |
| 5.7 | Trusted `x-forwarded-host` header without validation in auth callback | HIGH | `src/app/auth/callback/route.ts` | 14 | S | Validate against allowlist or remove |
| 5.8 | Weak password policy — only 6-char minimum, no complexity requirements | LOW | `src/app/[locale]/(auth)/registro/page.tsx` | 159 | S | Add password strength requirements |
| 5.9 | Weak email validation regex | LOW | `src/app/api/booking/route.ts`, `src/app/api/leads/route.ts` | 18 | S | Use Zod `z.string().email().max(254)` |

---

## Scoring

**Penalty calculation:**

| Severity | Count | Penalty per item | Total Penalty |
|----------|-------|-----------------|---------------|
| CRITICAL | 1     | -2.0            | -2.0          |
| HIGH     | 3     | -1.0            | -3.0          |
| MEDIUM   | 5     | -0.5            | -2.5          |
| LOW      | 4     | -0.1            | -0.4          |

**Bonuses:**
- No hardcoded secrets in source: +0.5
- No SQL injection patterns: +0.5
- No direct XSS vulnerabilities (React escaping): +0.5
- Wompi webhook has signature validation logic (even if bypassable): +0.1
- Supabase client parameterizes all queries: +0.5

**Score: 10.0 - 7.9 + 2.1 = 5.2/10**

---

## Priority Remediation Plan

### Immediate (This Week)

1. **[CRITICAL] Fix Wompi webhook bypass** — Make signature validation mandatory in `src/app/api/wompi/webhook/route.ts`. Reject if env var missing or signature absent.
2. **[HIGH] Fix open redirect** — Validate `next` param in `src/app/auth/callback/route.ts`. Allowlist valid paths.
3. **[HIGH] Fix `x-forwarded-host` trust** — Validate or remove in auth callback.

### Short-term (2 Weeks)

4. **[HIGH] Add rate limiting** — Install `@upstash/ratelimit` or similar. Protect public POST endpoints first.
5. **[MEDIUM] Add security headers** — Configure CSP, X-Frame-Options, HSTS, etc. in `next.config.mjs`.
6. **[MEDIUM] Add Zod validation** — Schema validation for all API request bodies.
7. **[MEDIUM] Fix race condition** — Atomic slot availability check via Supabase RPC.

### Medium-term (1 Month)

8. **[MEDIUM] Add CORS/CSRF protection** — Explicit CORS config and CSRF tokens.
9. **[HIGH] Update dependencies** — Run `npm audit fix`, plan Next.js major version upgrade.
10. **[LOW] Strengthen auth** — Password complexity, email validation, `.gitignore` gaps.

---

*Generated by Security Auditor (ln-621) on 2026-03-12*
