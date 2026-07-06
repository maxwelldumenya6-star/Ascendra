## Decision: JWT Authentication

**Date**: 2026-07-06

**Decision**: Implement JWT-based authentication with access and refresh tokens

**Reasoning**:
- Stateless authentication (no session storage needed)
- Scalable across multiple backend instances
- Works well with microservices
- Industry standard for APIs

**Alternatives**:
- Session-based auth (requires session store)
- OAuth 2.0 (overkill for MVP)

**Tradeoffs**:
- Token revocation requires token blacklist
- Token size increases with claims (acceptable)

---

## Decision: Role-Based Access Control

**Date**: 2026-07-06

**Decision**: Implement RBAC with three roles: admin, user, guest

**Reasoning**:
- Simple for MVP
- Easy to extend
- Common pattern

**Alternatives**:
- Attribute-based access control (more complex)
- Custom permission system (requires separate table)

---

## Decision: Password Hashing

**Date**: 2026-07-06

**Decision**: Use bcrypt for password hashing

**Reasoning**:
- Industry standard
- Slow by design (resistant to brute force)
- Well-tested library (passlib)

**Alternatives**:
- Argon2 (more secure but more complex)
- PBKDF2 (outdated)

---

## Decision: Monorepo Structure

**Date**: 2026-07-06

**Decision**: Use monorepo pattern

**Reasoning**:
- Shared types between backend and frontend
- Atomic commits for features
- Easier refactoring across services
- Simplified deployment

**Alternatives**:
- Microservices (too complex for initial phase)
- Separate repos (harder to maintain consistency)

**Tradeoffs**:
- Larger repo size (acceptable)
- More CI/CD complexity (manageable)

---

## Decision: Free-Tier Only Stack

**Date**: 2026-07-06

**Decision**: Use only free-tier services (Stripe, Paystack, Groq, Gemini, Railway)

**Reasoning**:
- No owner payment required
- Scalable as business grows
- Free tiers are generous for MVP

**Alternatives**:
- Paid services (rejected - owner constraint)

**Tradeoffs**:
- Rate limits on AI APIs (acceptable)
- Limited Railway resources (upgrade later)
- Stripe/Paystack free tier features sufficient

---

## Decision: Remove Flutterwave

**Date**: 2026-07-06

**Decision**: Replace Flutterwave with Paystack for African payments

**Reasoning**:
- Paystack free to use (earnings-based)
- Better integration documentation
- Coverage in key markets

**Alternatives**:
- Keep Flutterwave (has costs)
- Stripe only (limited African coverage)

---

## Decision: FastAPI + SQLAlchemy

**Date**: 2026-07-06

**Decision**: Use FastAPI with SQLAlchemy 2 and async

**Reasoning**:
- High performance
- Modern async/await support
- Automatic OpenAPI documentation
- Type safety

**Alternatives**:
- Django (too heavy)
- Flask (less performance)

---

## Decision: Next.js Frontend

**Date**: 2026-07-06

**Decision**: Use Next.js with React, TypeScript, Tailwind

**Reasoning**:
- Server-side rendering
- API routes
- Image optimization
- Built-in performance features

**Alternatives**:
- Pure React SPA (no SSR)
- Vue (smaller ecosystem)
