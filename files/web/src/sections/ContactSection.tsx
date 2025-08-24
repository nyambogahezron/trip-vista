import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import Button from '../components/Button';

const ContactSection: React.FC = () => {
	return (
		<section id='contact' className='py-20 bg-white dark:bg-gray-800'>
			<div className='container mx-auto px-4'>
				<div className='mb-12 text-center'>
					<motion.h2
						className='text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						Contact Us
					</motion.h2>
					<motion.p
						className='text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
					>
						Reach out to our team to start planning your next adventure
					</motion.p>
				</div>

				<div className='flex flex-col lg:flex-row gap-12'>
					{/* Contact Form */}
					<motion.div
						className='lg:w-2/3 bg-gray-50 dark:bg-gray-900 p-8 rounded-xl shadow-sm'
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<h3 className='text-2xl font-semibold mb-6 text-gray-800 dark:text-white'>
							Send Us a Message
						</h3>

						<form className='space-y-6'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div>
									<label
										htmlFor='name'
										className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
									>
										Your Name
									</label>
									<input
										type='text'
										id='name'
										className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors'
										placeholder='John Doe'
									/>
								</div>
								<div>
									<label
										htmlFor='email'
										className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
									>
										Email Address
									</label>
									<input
										type='email'
										id='email'
										className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors'
										placeholder='john@example.com'
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor='subject'
									className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
								>
									Subject
								</label>
								<input
									type='text'
									id='subject'
									className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors'
									placeholder='Tour Inquiry'
								/>
							</div>

							<div>
								<label
									htmlFor='message'
									className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
								>
									Message
								</label>
								<textarea
									id='message'
									rows={5}
									className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors'
									placeholder='Tell us about your travel plans...'
								></textarea>
							</div>

							<div>
								<Button
									type='submit'
									variant='primary'
									icon={<Send size={16} />}
								>
									Send Message
								</Button>
							</div>
						</form>
					</motion.div>

					{/* Contact Info */}
					<motion.div
						className='lg:w-1/3'
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<div className='bg-primary-600 text-white p-8 rounded-xl shadow-sm mb-6'>
							<h3 className='text-2xl font-semibold mb-6'>Get in Touch</h3>

							<div className='space-y-6'>
								<div className='flex items-start'>
									<div className='mr-3 mt-1'>
										<MapPin size={20} />
									</div>
									<div>
										<h4 className='font-medium mb-1'>Office Location</h4>
										<p className='text-primary-100'>
											123 Adventure Avenue
											<br />
											Traveler's District
											<br />
											Explore City, EC 12345
										</p>
									</div>
								</div>

								<div className='flex items-start'>
									<div className='mr-3 mt-1'>
										<Mail size={20} />
									</div>
									<div>
										<h4 className='font-medium mb-1'>Email Us</h4>
										<p className='text-primary-100'>
											info@tripVista.com
											<br />
											support@tripVista.com
										</p>
									</div>
								</div>

								<div className='flex items-start'>
									<div className='mr-3 mt-1'>
										<Phone size={20} />
									</div>
									<div>
										<h4 className='font-medium mb-1'>Call Us</h4>
										<p className='text-primary-100'>
											+1 (555) 123-4567
											<br />
											+1 (555) 987-6543
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className='bg-accent-500 text-white p-8 rounded-xl shadow-sm'>
							<h3 className='text-xl font-semibold mb-3'>Business Hours</h3>
							<ul className='space-y-2'>
								<li className='flex justify-between'>
									<span>Monday - Friday:</span>
									<span>9:00 AM - 6:00 PM</span>
								</li>
								<li className='flex justify-between'>
									<span>Saturday:</span>
									<span>10:00 AM - 4:00 PM</span>
								</li>
								<li className='flex justify-between'>
									<span>Sunday:</span>
									<span>Closed</span>
								</li>
							</ul>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default ContactSection;
