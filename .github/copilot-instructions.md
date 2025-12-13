# Trip Vista - AI Coding Agent Instructions

## Architecture Overview

**Stack**: Laravel 12 + React (Inertia.js) + TypeScript + Tailwind CSS + shadcn/ui

- **Backend**: Laravel handles API logic, auth, policies, and server-side rendering
- **Frontend**: React with Inertia.js (no traditional API endpoints - server renders props)
- **Routing**: Split across multiple files in `routes/` - `public.php`, `user.php`, `admin.php`, `auth.php`, `settings.php`
- **Build System**: Vite with Laravel plugin, supports SSR via `npm run build:ssr`

### Key Domain Models

The app is a travel agency booking platform with **polymorphic relationships**:

- **Agency** → has many Destinations, Bookings, Reviews (morphMany)
- **Destination** → belongs to Agency, has many Bookings, Reviews (morphMany)
- **Review** → morphTo `reviewable` (can review Agency OR Destination)
- **Booking** → belongs to User, Destination, Agency
- **User** → has many Bookings, Reviews, Notifications

**Critical Pattern**: Reviews use Laravel's polymorphic relations (`reviewable_type`, `reviewable_id`). Both Agency and Destination models have `reviews()` and `approvedReviews()` relationships.

## Development Workflow

### Starting Development

```bash
composer dev    # Runs server, queue worker, logs (pail), and vite concurrently
composer dev:ssr    # Same but with SSR server for Inertia
npm run dev    # Frontend only (if running PHP separately)
```

### Testing & Code Quality

```bash
composer test    # PHPUnit (uses in-memory SQLite)
npm run lint    # ESLint with auto-fix
npm run format    # Prettier
npm run types    # TypeScript type checking (noEmit)
```

### Database

```bash
php artisan migrate    # Run migrations
php artisan db:seed    # Seed with factories (AgencySeeder, etc.)
```

## Project-Specific Conventions

### Route Organization

- Routes are **split by concern**, not in `web.php`
- Admin routes use `admin.*` namespace and require `can:create,App\Models\Agency` ability
- Public routes allow guest access (controllers authorize via policies)
- API routes under `/api` prefix return JSON (for AJAX calls, not external API)

### Authorization Pattern

Controllers use `authorizeResource()` in `__construct()`:

```php
$this->authorizeResource(Agency::class, 'agency', [
    'except' => ['index', 'show', 'featured', 'api']
]);
```

Policies check `$user->is_admin` for create/update/delete operations.

### Inertia.js Data Flow

- Controllers render via `Inertia::render('page-name', ['data' => $data])`
- React pages in `resources/js/pages/` receive props from controller
- Use Inertia's `<Link>` component, NOT `<a>` tags for navigation
- Form submissions via Inertia forms: `router.post()`, `router.patch()`, etc.

### Frontend Structure

- **UI Components**: `resources/js/components/ui/` (shadcn/ui components)
- **Layouts**: `resources/js/layouts/` (app-layout.tsx wraps app-sidebar-layout)
- **Pages**: `resources/js/pages/` organized by feature (agencies/, destinations/, etc.)
- **Type Definitions**: `resources/js/types/index.d.ts` (shared interfaces)
- **Wayfinder Routes**: `resources/js/wayfinder/index.ts` - type-safe Laravel route helper

### TypeScript Patterns

- Use `index.d.ts` types for shared data structures (User, Agency, Destination)
- Props interfaces defined inline in page components
- Laravel Wayfinder generates type-safe route helpers with query params

### File Uploads

Image uploads stored in `storage/app/public/`:

```php
$request->file('logo')->store('agencies/logos', 'public');
```

Access via `Storage` facade or asset URLs.

### Request Validation

Use FormRequest classes in `app/Http/Requests/`:

- `StoreAgencyRequest`, `UpdateAgencyRequest` pattern
- Custom error messages defined in `messages()` method
- Image validation: `image|mimes:jpeg,png,jpg,gif|max:2048`

### Model Factories & Seeders

Factories in `database/factories/` use realistic fake data:

- `AgencyFactory` generates specialties, locations arrays
- Use `@use HasFactory<\Database\Factories\FactoryName>` PHPDoc annotation
- Seeders call factories with specific states

## Important Integration Points

### shadcn/ui Configuration

- Config in `components.json` with path aliases (`@/components`, `@/lib`)
- Components use CSS variables for theming (see `resources/css/app.css`)
- Tailwind v4 via `@tailwindcss/vite` plugin

### Laravel Wayfinder

- Generates type-safe route functions from Laravel routes
- Vite plugin configured with `formVariants: true`
- Import from `@/wayfinder` to get route helpers with TypeScript support

### Theme System

- Custom theme hook: `initializeTheme()` in `resources/js/hooks/use-appearance`
- Supports light/dark mode persistence

## Common Gotchas

1. **Polymorphic Reviews**: Always eager load `reviewable` relation to avoid N+1 queries
2. **Route Naming**: Admin routes prefixed with `admin.`, user routes are plain (e.g., `bookings.index`)
3. **SSR Support**: Use `resources/js/ssr.tsx` entry point for SSR builds
4. **Policies vs Middleware**: Prefer policies over middleware for resource authorization
5. **Array Casting**: `social_media`, `specialties`, `locations` are JSON columns cast to arrays
6. **Soft Deletes**: Reviews use soft deletes (`deleted_at`)

## When Creating New Features

1. **Model**: Add to `app/Models/`, define relationships, casts, fillable
2. **Migration**: Use descriptive timestamp prefix, add indexes for foreign keys
3. **Factory**: Create realistic test data in `database/factories/`
4. **Policy**: Authorization logic in `app/Policies/`, register in `AuthServiceProvider`
5. **Request**: Validation in `app/Http/Requests/` with custom messages
6. **Controller**: Resource controllers in `app/Http/Controllers/`, use `authorizeResource()`
7. **Routes**: Add to appropriate file in `routes/` with named routes
8. **React Page**: Create in `resources/js/pages/` with TypeScript types
9. **Types**: Update `resources/js/types/index.d.ts` for shared interfaces
