import AppLayout from "@/layouts/AppLayout";
import { motion } from 'framer-motion';
import { Globe, Award, ThumbsUp,  CheckCircle } from 'lucide-react';

export default function About() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

  return (
      <AppLayout title="About - Trip Vista">
          {/* Hero Section */}
          <section className="bg-linear-to-r from-primary to-primary/70 pt-32 pb-16 text-white">
              <div className="container mx-auto px-4">
                  <motion.div
                      className="mx-auto max-w-3xl text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                  >
                      <h1 className="mb-4 text-4xl font-bold md:text-5xl">About TripVista</h1>
                      <p className="mb-8 text-xl text-white/90">
                          We're passionate about bringing unforgettable travel experiences to adventurers around the world.
                      </p>
                  </motion.div>
              </div>
          </section>

          {/* Our Story */}
          <section className="py-16">
              <div className="container mx-auto px-4">
                  <div className="mx-auto max-w-4xl">
                      <motion.div
                          className="flex flex-col items-center gap-12 md:flex-row"
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: '-100px' }}
                          variants={fadeInUp}
                      >
                          <div className="md:w-1/2">
                              <h2 className="mb-4 text-3xl font-bold">Our Story</h2>
                              <p className="mb-4 text-muted-foreground">
                                  TripVista began in 2015 with a simple idea: to connect travelers with authentic local experiences around the world.
                                  Our founders, avid travelers themselves, were frustrated with cookie-cutter tours that missed the true essence of
                                  destinations.
                              </p>
                              <p className="text-muted-foreground">
                                  Starting with just three destinations and a handful of partner agencies, we've grown to feature hundreds of
                                  carefully vetted tours across six continents. Our mission remains the same: to help travelers discover the world in
                                  meaningful ways through responsible tourism and authentic cultural exchange.
                              </p>
                          </div>
                          <div className="overflow-hidden rounded-xl shadow-xl md:w-1/2">
                              <img
                                  src="https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=2670&auto=format&fit=crop"
                                  alt="Our Story"
                                  className="h-auto w-full"
                              />
                          </div>
                      </motion.div>
                  </div>
              </div>
          </section>

          {/* Our Mission */}
          <section className="bg-muted py-16">
              <div className="container mx-auto px-4">
                  <motion.div
                      className="mx-auto max-w-3xl text-center"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-100px' }}
                      variants={fadeInUp}
                  >
                      <h2 className="mb-4 text-3xl font-bold">Our Mission</h2>
                      <p className="mb-8 text-lg">
                          We believe travel has the power to transform lives, broaden perspectives, and create positive change in the world.
                      </p>

                      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                          <div className="rounded-xl bg-card p-6 shadow-md">
                              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                                  <Globe className="h-7 w-7 text-primary" />
                              </div>
                              <h3 className="mb-2 text-xl font-semibold">Connect Cultures</h3>
                              <p className="text-muted-foreground">
                                  Creating meaningful exchanges between travelers and local communities around the world.
                              </p>
                          </div>

                          <div className="rounded-xl bg-card p-6 shadow-md">
                              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                                  <Award className="h-7 w-7 text-primary" />
                              </div>
                              <h3 className="mb-2 text-xl font-semibold">Promote Quality</h3>
                              <p className="text-muted-foreground">Upholding the highest standards for our tour partners and experiences we offer.</p>
                          </div>

                          <div className="rounded-xl bg-card p-6 shadow-md">
                              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                                  <ThumbsUp className="h-7 w-7 text-primary" />
                              </div>
                              <h3 className="mb-2 text-xl font-semibold">Support Sustainability</h3>
                              <p className="text-muted-foreground">
                                  Encouraging responsible travel practices that benefit both communities and environments.
                              </p>
                          </div>
                      </div>
                  </motion.div>
              </div>
          </section>

          {/* Our Team */}
          <section className="py-16">
              <div className="container mx-auto px-4">
                  <motion.div
                      className="mx-auto mb-12 max-w-3xl text-center"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-100px' }}
                      variants={fadeInUp}
                  >
                      <h2 className="mb-4 text-3xl font-bold">Meet Our Team</h2>
                      <p className="text-muted-foreground">
                          We're a diverse group of travel enthusiasts dedicated to making your adventures unforgettable.
                      </p>
                  </motion.div>

                  <motion.div
                      className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-100px' }}
                      variants={{
                          hidden: { opacity: 0 },
                          visible: {
                              opacity: 1,
                              transition: { staggerChildren: 0.1 },
                          },
                      }}
                  >
                      {[
                          {
                              name: 'Sarah Johnson',
                              position: 'CEO & Founder',
                              image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2574&auto=format&fit=crop',
                          },
                          {
                              name: 'Michael Chen',
                              position: 'Chief Travel Officer',
                              image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2574&auto=format&fit=crop',
                          },
                          {
                              name: 'Elena Rodriguez',
                              position: 'Partnerships Director',
                              image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2622&auto=format&fit=crop',
                          },
                          {
                              name: 'David Okafor',
                              position: 'Customer Experience',
                              image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop',
                          },
                      ].map((member, index) => (
                          <motion.div key={index} className="group overflow-hidden rounded-xl bg-card shadow-md" variants={fadeInUp}>
                              <div className="h-64 overflow-hidden">
                                  <img
                                      src={member.image}
                                      alt={member.name}
                                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  />
                              </div>
                              <div className="p-5 text-center">
                                  <h3 className="mb-1 text-xl font-semibold">{member.name}</h3>
                                  <p className="text-muted-foreground">{member.position}</p>
                              </div>
                          </motion.div>
                      ))}
                  </motion.div>
              </div>
          </section>

          {/* Why Choose Us */}
          <section className="bg-primary/5 py-16">
              <div className="container mx-auto px-4">
                  <motion.div
                      className="mx-auto max-w-4xl"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-100px' }}
                      variants={fadeInUp}
                  >
                      <h2 className="mb-12 text-center text-3xl font-bold">Why Travelers Choose Us</h2>

                      <div className="space-y-6">
                          {[
                              {
                                  title: 'Curated Experiences',
                                  description: 'We personally vet every tour and agency partner to ensure the highest quality experiences.',
                              },
                              {
                                  title: '24/7 Support',
                                  description:
                                      'Our dedicated team is available around the clock to assist with any issues or questions during your travels.',
                              },
                              {
                                  title: 'Local Expertise',
                                  description: 'We partner with knowledgeable local guides who provide authentic insights into destinations.',
                              },
                              {
                                  title: 'Best Price Guarantee',
                                  description: "Find the same tour for a lower price? We'll match it and give you an additional discount.",
                              },
                          ].map((item, index) => (
                              <div key={index} className="flex gap-4">
                                  <div className="mt-1 shrink-0">
                                      <CheckCircle className="h-6 w-6 text-primary" />
                                  </div>
                                  <div>
                                      <h3 className="mb-1 text-xl font-semibold">{item.title}</h3>
                                      <p className="text-muted-foreground">{item.description}</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </motion.div>
              </div>
          </section>
      </AppLayout>
  );
}
