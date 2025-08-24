import React from 'react';
import {
	Facebook,
	Instagram,
	Twitter,
	Youtube,
	Globe,
	ArrowRight,
} from 'lucide-react';

const Footer: React.FC = () => {
	return (
		<footer className='bg-gray-900 text-gray-300'>
			<div className='container mx-auto px-4 py-16'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					{/* Company Info */}
					<div>
						<div className='flex items-center mb-6'>
							<Globe className='h-8 w-8 text-primary-500 mr-2' />
							<span className='text-xl font-bold text-white'>tripVista</span>
						</div>
						<p className='mb-6'>
							Discover the world with tripVista, your trusted partner for
							unforgettable travel experiences and adventures.
						</p>
						<div className='flex space-x-4'>
							<a
								href='#'
								className='text-gray-400 hover:text-primary-400 transition-colors'
							>
								<Facebook size={20} />
							</a>
							<a
								href='#'
								className='text-gray-400 hover:text-primary-400 transition-colors'
							>
								<Twitter size={20} />
							</a>
							<a
								href='#'
								className='text-gray-400 hover:text-primary-400 transition-colors'
							>
								<Instagram size={20} />
							</a>
							<a
								href='#'
								className='text-gray-400 hover:text-primary-400 transition-colors'
							>
								<Youtube size={20} />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className='text-lg font-semibold text-white mb-6'>
							Quick Links
						</h3>
						<ul className='space-y-3'>
							<li>
								<a
									href='#home'
									className='hover:text-primary-400 transition-colors flex items-center'
								>
									<ArrowRight size={14} className='mr-2' /> Home
								</a>
							</li>
							<li>
								<a
									href='#destinations'
									className='hover:text-primary-400 transition-colors flex items-center'
								>
									<ArrowRight size={14} className='mr-2' /> Destinations
								</a>
							</li>
							<li>
								<a
									href='#agencies'
									className='hover:text-primary-400 transition-colors flex items-center'
								>
									<ArrowRight size={14} className='mr-2' /> Travel Agencies
								</a>
							</li>
							<li>
								<a
									href='#reviews'
									className='hover:text-primary-400 transition-colors flex items-center'
								>
									<ArrowRight size={14} className='mr-2' /> Reviews
								</a>
							</li>
							<li>
								<a
									href='#contact'
									className='hover:text-primary-400 transition-colors flex items-center'
								>
									<ArrowRight size={14} className='mr-2' /> Contact Us
								</a>
							</li>
						</ul>
					</div>

					{/* Popular Destinations */}
					<div>
						<h3 className='text-lg font-semibold text-white mb-6'>
							Popular Destinations
						</h3>
						<ul className='space-y-3'>
							<li>
								<a
									href='#'
									className='hover:text-primary-400 transition-colors flex items-center'
								>
									<ArrowRight size={14} className='mr-2' /> Bali, Indonesia
								</a>
							</li>
							<li>
								<a
									href='#'
									className='hover:text-primary-400 transition-colors flex items-center'
								>
									<ArrowRight size={14} className='mr-2' /> Santorini, Greece
								</a>
							</li>
							<li>
								<a
									href='#'
									className='hover:text-primary-400 transition-colors flex items-center'
								>
									<ArrowRight size={14} className='mr-2' /> Kyoto, Japan
								</a>
							</li>
							<li>
								<a
									href='#'
									className='hover:text-primary-400 transition-colors flex items-center'
								>
									<ArrowRight size={14} className='mr-2' /> Swiss Alps
								</a>
							</li>
							<li>
								<a
									href='#'
									className='hover:text-primary-400 transition-colors flex items-center'
								>
									<ArrowRight size={14} className='mr-2' /> Machu Picchu, Peru
								</a>
							</li>
						</ul>
					</div>

					{/* Newsletter */}
					<div>
						<h3 className='text-lg font-semibold text-white mb-6'>
							Newsletter
						</h3>
						<p className='mb-4'>
							Subscribe to our newsletter for travel tips, deals, and
							inspiration.
						</p>
						<form className='flex'>
							<input
								type='email'
								placeholder='Your email address'
								className='px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-800 border border-gray-700'
							/>
							<button
								type='submit'
								className='bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r-md transition-colors'
							>
								<ArrowRight size={20} />
							</button>
						</form>
					</div>
				</div>

				<hr className='border-gray-800 my-10' />

				<div className='flex flex-col md:flex-row justify-between items-center'>
					<p>&copy; 2025 tripVista. All rights reserved.</p>
					<div className='flex space-x-6 mt-4 md:mt-0'>
						<a href='#' className='hover:text-primary-400 transition-colors'>
							Privacy Policy
						</a>
						<a href='#' className='hover:text-primary-400 transition-colors'>
							Terms of Service
						</a>
						<a href='#' className='hover:text-primary-400 transition-colors'>
							Sitemap
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
