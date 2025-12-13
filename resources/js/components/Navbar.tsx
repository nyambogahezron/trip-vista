import { about, contact, dashboard, home, login, register } from '@/routes';
import agencies from '@/routes/agencies';
import destinations from '@/routes/destinations';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Compass, Menu, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeToggle } from './ThemeProvider';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { auth } = usePage<SharedData>().props;
    const { url } = usePage();

    const routes = useMemo(
        () => ({
            home: home().url,
            destinations: destinations.index().url,
            agencies: agencies.index().url,
            about: about().url,
            contact: contact().url,
            dashboard: dashboard().url,
            login: login().url,
            register: register().url,
        }),
        [],
    );

    const isActiveRoute = useCallback(
        (routePath: string) => {
            return url === routePath;
        },
        [url],
    );

    const getNavLinkClasses = useCallback(
        (routePath: string) => {
            const isActive = isActiveRoute(routePath);

            return `relative py-2 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:content-[''] ${
                isActive
                    ? 'text-primary after:scale-x-100 after:origin-bottom-left'
                    : 'hover:text-primary hover:after:origin-bottom-left hover:after:scale-x-100'
            }`;
        },
        [isActiveRoute],
    );

    const getMobileNavLinkClasses = useCallback(
        (routePath: string) => {
            const isActive = isActiveRoute(routePath);
            return `block py-2 transition-colors ${isActive ? 'text-primary font-medium' : 'hover:text-primary'}`;
        },
        [isActiveRoute],
    );

    const handleMenuClose = useCallback(() => setIsOpen(false), []);

    const handleMenuToggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);

    const headerClasses = useMemo(
        () =>
            `fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
                isScrolled ? 'bg-background/80 py-2 shadow-md backdrop-blur-lg' : 'bg-transparent py-4'
            }`,
        [isScrolled],
    );

    const logoTextClasses = useMemo(() => `${isScrolled ? 'text-foreground' : 'text-white text-shadow'}`, [isScrolled]);

    const navClasses = useMemo(() => `${isScrolled ? 'text-foreground' : 'text-white text-shadow'}`, [isScrolled]);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    if (scrollY > 10 && !isScrolled) {
                        setIsScrolled(true);
                    } else if (scrollY <= 10 && isScrolled) {
                        setIsScrolled(false);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isScrolled]);

    const navigationItems = useMemo(
        () => [
            { href: routes.home, label: 'Home' },
            { href: routes.destinations, label: 'Destinations' },
            { href: routes.agencies, label: 'Agencies' },
            { href: routes.about, label: 'About' },
            { href: routes.contact, label: 'Contact' },
        ],
        [routes],
    );

    return (
        <header className={headerClasses}>
            <div className="container mx-auto flex items-center justify-between px-4">
                <Link href={routes.home} className="flex items-center gap-2 text-2xl font-bold text-primary">
                    <Compass className="h-8 w-8 animate-pulse stroke-primary" />
                    <span className={logoTextClasses}>TripVista</span>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    <nav className={navClasses}>
                        <ul className="flex space-x-8">
                            {navigationItems.map(({ href, label }) => (
                                <li key={href}>
                                    <Link href={href} className={getNavLinkClasses(href)}>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    {auth.user ? (
                        <>
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-sm px-2 py-1.5 text-sm leading-normal text-[#1b1b18] hover:text-blue-600 dark:text-[#EDEDEC]"
                            >
                                Hey 👋 {auth.user.name}
                            </Link>
                            <Link
                                href={routes.dashboard}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href={routes.login}
                                className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                            >
                                Log in
                            </Link>
                            <Link
                                href={routes.register}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Register
                            </Link>
                        </>
                    )}

                    <ThemeToggle />
                </div>

                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />
                    <button className="rounded-md p-2 focus:outline-none" onClick={handleMenuToggle}>
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="absolute top-full right-0 left-0 animate-fade-in border-t border-border bg-background/95 shadow-lg backdrop-blur-lg md:hidden">
                    <nav className="container mx-auto py-4">
                        <ul className="flex flex-col space-y-4 px-4">
                            {navigationItems.map(({ href, label }) => (
                                <li key={href}>
                                    <Link href={href} className={getMobileNavLinkClasses(href)} onClick={handleMenuClose}>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                            {auth.user ? (
                                <li>
                                    <Link
                                        href={routes.dashboard}
                                        className="block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                        onClick={handleMenuClose}
                                    >
                                        Welcome {auth.user.name}
                                    </Link>

                                    <Link
                                        href={routes.dashboard}
                                        className="block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                        onClick={handleMenuClose}
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            href={routes.login}
                                            className="block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                            onClick={handleMenuClose}
                                        >
                                            Log in
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={routes.register}
                                            className="block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                            onClick={handleMenuClose}
                                        >
                                            Register
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    );
}
