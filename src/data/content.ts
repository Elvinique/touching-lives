import {
  DoorOpen,
  Sprout,
  Users,
  HandHeart,
  HeartHandshake,
  Gift,
  House,
  Heart,
  TreePine,
  Music4,
  BookOpen,
  Car,
  MicVocal,
  Baby,
  Shirt,
  Timer,
  Accessibility,
  Coffee,
  MessagesSquare,
  Phone,
  Eye,
  Flame,
  Lock,
  type AstroComponent,
} from '@lucide/astro';
import { site } from '@/config/site';

export interface LinkedItem {
  icon: AstroComponent;
  title: string;
  description: string;
  href: string;
  cta: string;
}

/* Home — "What's your next step?" */
export const nextSteps: LinkedItem[] = [
  {
    icon: DoorOpen,
    title: "I'm new",
    description: 'Plan your first visit — what to expect, where to park, and who to look for.',
    href: '/visit',
    cta: 'Plan your visit',
  },
  {
    icon: Sprout,
    title: 'I want to grow',
    description: 'Start the Growth Track and take your next step with God in community.',
    href: '/events/growth-track',
    cta: 'Start the Growth Track',
  },
  {
    icon: Users,
    title: 'Find a group',
    description: 'Life groups are where Sundays become the rest of your week.',
    href: '/ministries/life-groups',
    cta: 'Explore life groups',
  },
  {
    icon: HandHeart,
    title: 'Serve',
    description: 'Use your gifts to help people encounter the love of Jesus.',
    href: '/ministries',
    cta: 'Find your place to serve',
  },
  {
    icon: HeartHandshake,
    title: 'Request prayer',
    description: 'You don’t have to walk through it alone. Our team would love to pray with you.',
    href: '/prayer',
    cta: 'Request prayer',
  },
  {
    icon: Gift,
    title: 'Give',
    description: 'Generosity is a way of saying “yes” to what God is doing through our church.',
    href: '/give',
    cta: 'Give online',
  },
];

/* About */
export const values = [
  {
    icon: DoorOpen,
    title: 'Welcome first',
    description: 'Before anyone earns a seat, we offer one. Hospitality is our front door and our theology.',
  },
  {
    icon: Heart,
    title: 'Real over polished',
    description: 'We don’t ask people to pretend. Honest faith, honest questions, honest lives.',
  },
  {
    icon: TreePine,
    title: 'Grow together',
    description: 'Nobody grows alone. Discipleship happens around tables, in groups, in the mess.',
  },
  {
    icon: HandHeart,
    title: 'Serve like Jesus',
    description: 'We find our lives by giving them away — in our city and around the world.',
  },
  {
    icon: Gift,
    title: 'Give generously',
    description: 'Everything we have came from God. Generosity is our response, not our obligation.',
  },
] as const;

export const stats = [
  { value: '40+', label: 'Years of ministry' },
  { value: '1,200', label: 'People in a typical weekend' },
  { value: '60+', label: 'Life groups across the city' },
  { value: '12', label: 'Countries touched through missions' },
] as const;

export const timeline = [
  {
    year: '1984',
    title: 'A living room becomes a church',
    description: 'Twelve friends begin meeting for prayer and worship in a South Austin living room.',
  },
  {
    year: '1991',
    title: 'The Fellowship Lane campus',
    description: 'We move into our first building — a converted warehouse we grew to love as home.',
  },
  {
    year: '2005',
    title: 'A family of churches',
    description: 'Touching Lives plants its first campus across town, and later partners with churches abroad.',
  },
  {
    year: '2020',
    title: 'Church beyond walls',
    description: 'We learn to be the church online — and discover people we could never have reached before.',
  },
  {
    year: 'Today',
    title: 'Still just getting started',
    description: 'New faces, new groups, new neighborhoods. The next chapter is being written together.',
  },
] as const;

export const beliefs = [
  {
    title: 'God is love',
    body: 'We believe in one God — Father, Son, and Holy Spirit — who is knowable, good, and relentlessly loving.',
  },
  {
    title: 'Jesus changes everything',
    body: 'We believe Jesus is the Son of God, fully God and fully human, who lived, died, and rose again so that we could be made whole.',
  },
  {
    title: 'Grace is a gift',
    body: 'We believe we are saved by grace through faith — not by being good enough, but by trusting Jesus.',
  },
  {
    title: 'The Bible is our guide',
    body: 'We believe Scripture is inspired and useful for teaching, correcting, and shaping how we live and love.',
  },
  {
    title: 'The Spirit is at work',
    body: 'We believe the Holy Spirit lives in every believer, empowering us to become more like Jesus.',
  },
  {
    title: 'The Church is a family',
    body: 'We believe the Church is not a building but a people — diverse, messy, and learning to love one another.',
  },
] as const;

/* Plan Your Visit */
export const expectations = [
  {
    icon: Car,
    title: 'Parking',
    description: 'Free, abundant parking with guest spots right by the front door. Look for the signs.',
  },
  {
    icon: Coffee,
    title: 'Coffee first',
    description: 'Grab a coffee in the Gathering Hall. Our welcome team is easy to spot and happy to help.',
  },
  {
    icon: Music4,
    title: 'Worship',
    description: 'Expect a full band, familiar and new songs, and space to simply be present with God.',
  },
  {
    icon: MicVocal,
    title: 'Preaching',
    description: 'A 30-minute message that is practical, Bible-based, and honest about real life.',
  },
  {
    icon: Baby,
    title: 'Kids',
    description: 'Touching Lives Kids is safe, fun, and age-appropriate from nursery through 5th grade.',
  },
  {
    icon: Shirt,
    title: 'Dress',
    description: 'Jeans, shorts, button-ups — wear what makes you comfortable. Seriously.',
  },
  {
    icon: Timer,
    title: 'Length',
    description: 'Services run about 75 minutes from first note to last song.',
  },
  {
    icon: Accessibility,
    title: 'Accessibility',
    description: 'Fully accessible building with elevators, hearing assistance, and a quiet room.',
  },
] as const;

export const firstVisitSteps = [
  {
    icon: Car,
    title: 'Arrive',
    description: 'Guest parking is right up front. Our team will greet you by name and point you inside.',
  },
  {
    icon: Coffee,
    title: 'Coffee & community',
    description: 'Stop by the Gathering Hall for coffee. We’d love to meet you — no pressure, no name tags required.',
  },
  {
    icon: Music4,
    title: 'Worship together',
    description: 'Find a seat anywhere. Screens guide everything, so you never have to wonder what’s next.',
  },
  {
    icon: MessagesSquare,
    title: 'Say hello on the way out',
    description: 'We’d genuinely love to meet you. Grab a welcome gift at the guest table in the lobby.',
  },
] as const;

export const faqs = [
  {
    q: 'What time should I arrive?',
    a: 'Aim for 15 minutes early on your first visit — it gives you time to park, grab coffee, and get your kids checked in at your own pace.',
  },
  {
    q: 'Where do I go when I walk in?',
    a: 'The main entrance opens into our Gathering Hall. Look for the “Welcome” table — the people there can answer anything and show you to the auditorium.',
  },
  {
    q: 'What is the service like?',
    a: 'About 75 minutes: a few songs led by our band, a short welcome, a practical message from Scripture, and a moment to respond. Screens guide everything.',
  },
  {
    q: 'What about my kids?',
    a: 'Kids check in at Touching Lives Kids before the service. It’s safe, fun, and staffed by trained volunteers. You’ll get a text if your child needs you.',
  },
  {
    q: 'What do people wear?',
    a: 'Everything from jeans to suits. Come as you are — you’ll fit in either way.',
  },
  {
    q: 'Will I be singled out as a guest?',
    a: 'Never. We won’t make you raise your hand or stand up. We simply want you to feel at home.',
  },
] as const;

/* Prayer */
export const prayerPromises = [
  {
    icon: Lock,
    title: 'Confidential',
    description: 'Your request stays between you and our prayer team. Nothing is shared publicly, ever.',
  },
  {
    icon: BookOpen,
    title: 'Scripture-based',
    description: 'Our team prays with Scripture, believing God’s promises are alive and active today.',
  },
  {
    icon: Flame,
    title: 'Followed up',
    description: 'If you’d like, a team member will reach out within a few days to check in and keep praying.',
  },
] as const;

/* Home — human stories (pending — no fabricated testimonials; the homepage
   StoryBand renders nothing until verified stories exist here) */
export const stories: { quote: string; name: string; role: string }[] = [];

/* Footer / contact — derived from the central site config (single source of truth) */
export const contactChannels = [
  {
    icon: House,
    label: 'Address',
    value: `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`,
    href: null,
  },
  { icon: Phone, label: 'Phone', value: site.phone, href: `tel:${site.phone.replace(/[^+\d]/g, '')}` },
  { icon: Eye, label: 'Email', value: site.email, href: `mailto:${site.email}` },
] as const;
