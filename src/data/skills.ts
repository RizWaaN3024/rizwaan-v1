import type { Skill } from '@/types';

export const SKILLS: Skill[] = [
  // Frontend
  { name: 'React', description: 'JavaScript Library', icon: '/react.svg', bgColor: 'bg-[#61DAFB]/20' },
  { name: 'Next.js', description: 'React Framework', icon: '/nextjs.svg', bgColor: 'bg-gray-100/20' },
  { name: 'TypeScript', description: 'JavaScript Superset', icon: '/typescript.svg', bgColor: 'bg-[#3178C6]/20' },
  { name: 'JavaScript', description: 'Programming Language', icon: '/javascript.svg', bgColor: 'bg-[#F7DF1E]/20' },
  { name: 'Java', description: 'Programming Language', icon: '/java.svg', bgColor: 'bg-[#ED8B00]/20' },
  { name: 'Tailwind CSS', description: 'CSS Framework', icon: '/tailwind.svg', bgColor: 'bg-[#0EA5E9]/20' },

  // Backend
  { name: 'Node.js', description: 'JavaScript Runtime', icon: '/node-js.svg', bgColor: 'bg-[#689F63]/20' },
  { name: 'Express.js', description: 'Web Framework', icon: '/express.png', bgColor: 'bg-white/10' },
  { name: 'PHP', description: 'Server-side Language', icon: '/php.svg', bgColor: 'bg-[#777BB4]/20' },
  { name: 'Socket.io', description: 'Real-time Communication', icon: '/socketio.svg', bgColor: 'bg-white/10' },
  { name: 'Symfony', description: 'PHP Framework', icon: '/symfony.svg', bgColor: 'bg-white/10' },

  // Database & ORM
  { name: 'MongoDB', description: 'NoSQL Database', icon: '/mongodb.svg', bgColor: 'bg-[#47A248]/20' },
  { name: 'MySQL', description: 'SQL Database', icon: '/mysql.svg', bgColor: 'bg-[#4479A1]/20' },
  { name: 'Prisma', description: 'Database ORM', icon: '/prisma.svg', bgColor: 'bg-[#2D3748]/20' },
  { name: 'Doctrine ORM', description: 'PHP ORM', icon: '/doctrine-orm.svg', bgColor: 'bg-[#FC6C2C]/20' },

  // Mobile
  { name: 'React Native', description: 'Mobile Development', icon: '/react.svg', bgColor: 'bg-[#61DAFB]/20' },

  // Tools & DevOps
  { name: 'Git', description: 'Version Control', icon: '/git.svg', bgColor: 'bg-[#F05032]/20' },
  { name: 'Docker', description: 'Containerization', icon: '/docker.svg', bgColor: 'bg-[#2496ED]/20' },
  { name: 'Postman', description: 'API Testing', icon: '/postman.svg', bgColor: 'bg-[#FF6C37]/20' },
  { name: 'Figma', description: 'Design Tool', icon: '/figma-logo.svg', bgColor: 'bg-[#F24E1E]/20' },
];
