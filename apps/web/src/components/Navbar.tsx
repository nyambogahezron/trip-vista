import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Navbar: React.FC = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { theme, toggleTheme } = useTheme();

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const navLinks = [
		{ name: 'Home', href: '#home' },
		{ name: 'Destinations', href: '#destinations' },
		{ name: 'Agencies', href: '#agencies' },
		{ name: 'Reviews', href: '#reviews' },
		{ name: 'Contact', href: '#contact' },
	];

	return (
		<motion.nav
			className={`fixed w-full z-50 transition-all duration-300 ${
				isScrolled
					? 'bg-white dark:bg-gray-900 shadow-md py-3'
					: 'bg-transparent py-5'
			}`}
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className='container mx-auto px-4'>
				<div className='flex justify-between items-center'>
					<a href='#home' className='flex items-center'>
						<Globe
							className={`h-8 w-8 ${
								isScrolled
									? 'text-primary-600 dark:text-primary-400'
									: 'text-white'
							}`}
						/>
						<span
							className={`ml-2 text-xl font-bold ${
								isScrolled ? 'text-gray-800 dark:text-white' : 'text-white'
							}`}
						>
							tripVista
						</span>
					</a>

					<div className='hidden md:flex items-center space-x-8'>
						{navLinks.map((link) => (
							<a
								key={link.name}
								href={link.href}
								className={`hover:text-primary-500 transition-colors ${
									isScrolled ? 'text-gray-700 dark:text-gray-200' : 'text-white'
								}`}
							>
								{link.name}
							</a>
						))}
						<button
							onClick={toggleTheme}
							className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
								isScrolled ? 'text-gray-700 dark:text-gray-200' : 'text-white'
							}`}
							aria-label='Toggle dark mode'
						>
							{theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
						</button>
					</div>

					<div className='md:hidden flex items-center'>
						<button
							onClick={toggleTheme}
							className={`p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
								isScrolled ? 'text-gray-700 dark:text-gray-200' : 'text-white'
							}`}
							aria-label='Toggle dark mode'
						>
							{theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
						</button>
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className={
								isScrolled ? 'text-gray-700 dark:text-gray-200' : 'text-white'
							}
							aria-label='Menu'
						>
							{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<motion.div
					className='md:hidden bg-white dark:bg-gray-900 shadow-lg'
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: 'auto' }}
					exit={{ opacity: 0, height: 0 }}
					transition={{ duration: 0.3 }}
				>
					<div className='container mx-auto px-4 py-4 flex flex-col space-y-4'>
						{navLinks.map((link) => (
							<a
								key={link.name}
								href={link.href}
								className='text-gray-700 dark:text-gray-200 hover:text-primary-500 transition-colors py-2'
								onClick={() => setIsMobileMenuOpen(false)}
							>
								{link.name}
							</a>
						))}
					</div>
				</motion.div>
			)}
		</motion.nav>
	);
};

export default Navbar;
