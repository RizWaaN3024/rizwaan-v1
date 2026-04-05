import type { Experience } from '@/types';

export const EXPERIENCES: Experience[] = [
  {
    id: '01',
    year: '2024',
    company: 'Oro Media Lab',
    role: 'Full Stack Developer',
    location: 'Bangalore',
    duration: 'Feb 2024 – Present',
    type: 'Full-time',
    description:
      'Leading end-to-end development of COSKO, a multi-city service marketplace operating across Bangalore, Hyderabad, Mumbai, Mysore, and Delhi.',
    achievements: [
      'Built a React Native partner app and Next.js admin dashboard supporting 15+ partners and handling 500+ leads per day',
      'Implemented wallet-based payment flows using Razorpay and PhonePe, with partners adding approximately ₹10,000 per week',
      'Containerized backend services using Docker, ensuring consistent development and deployment environments',
      'Improved Google PageSpeed scores from 60 to 96+ by optimizing frontend performance and Core Web Vitals',
      'Built performance-safe GSAP animations to enhance user experience without degrading load times',
      'Collaborated with clients and stakeholders, handled deployments, and mentored junior developers',
    ],
    tech: ['React', 'React Native', 'Next.js', 'Node.js', 'PHP Symfony', 'MySQL', 'Docker', 'Razorpay', 'PhonePe'],
    current: true,
  },
  {
    id: '02',
    year: '2024',
    company: 'QuickFly.ae',
    role: 'Freelance Frontend Developer',
    location: 'Dubai (Remote)',
    duration: 'Oct 2024 – Nov 2024',
    type: 'Contract',
    description:
      'Delivered a production-ready frontend for a Dubai-based logistics and cargo shipment platform.',
    achievements: [
      'Developed the complete frontend using Next.js, TypeScript, and Tailwind CSS',
      'Integrated EmailJS for automated lead capture and client communication',
      'Delivered a fully responsive, SEO-optimized web experience on a tight timeline',
    ],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'EmailJS'],
    current: false,
  },
  {
    id: '03',
    year: '2023',
    company: 'Indegene',
    role: 'Web Developer',
    location: 'Bangalore',
    duration: 'Sep 2023 – Feb 2024',
    type: 'Full-time',
    description:
      'Developed responsive web pages and marketing emailers for enterprise healthcare clients with focus on cross-platform compatibility.',
    achievements: [
      'Built responsive marketing emailers and web pages for top-tier healthcare clients',
      'Ensured cross-platform compatibility across all major browsers and email clients',
      'Delivered pixel-perfect designs with optimal performance metrics',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Email Development'],
    current: false,
  },
];
