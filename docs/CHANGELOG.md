# CHANGELOG.md

## [0.4.0] - 2026-07-06

### Added
- Password reset token model
- Password reset service
- Password reset endpoints
- Forgot password page (frontend)
- Reset password page (frontend)
- Token verification for password reset
- Password reset schemas

### Changed
- Updated login page with forgot password link
- Updated dashboard with resend verification link

---

## [0.3.0] - 2026-07-06

### Added
- Email verification tokens
- Email verification service
- Email verification endpoints
- Frontend email verification page
- Frontend login page
- Frontend registration page
- Frontend dashboard
- Protected layout component
- Authentication API client
- Zustand auth store

### Changed
- Updated auth endpoints to send verification emails

---

## [0.2.0] - 2026-07-06

### Added
- User authentication system
- JWT access and refresh tokens
- User registration endpoint
- User login endpoint
- Token refresh endpoint
- Protected route dependencies
- User profile endpoints
- User service layer
- User models and schemas
- Authentication tests
- Password hashing and verification

### Changed
- Updated main.py with API v1 router

### Infrastructure
- Added authentication dependencies
- Added user service business logic

---

## [0.1.0] - 2026-07-06

### Added
- Initial monorepo setup
- Backend scaffold with FastAPI
- Frontend scaffold with Next.js
- Docker Compose configuration
- GitHub Actions CI/CD pipeline
- Project documentation
- Environment configuration

### Changed
- Removed Flutterwave (replaced with Paystack)
- Locked to free-tier services only

### Infrastructure
- PostgreSQL setup
- Redis configuration
- Celery task queue
- Database migrations framework
