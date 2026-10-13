// Saare library details yahan se edit karo
const LIBRARY = {
  name: 'Sir Ambedkar Library',
  tagline: 'Your Space. Your Focus. Your Future.',
  location: 'Abdullapur, Meerut, Uttar Pradesh',
  phone: '+91-XXXXXXXXXX',
  email: 'contact@example.com',
  whatsapp: '+91-XXXXXXXXXX',
  hours: [
    { day: 'Monday – Friday', time: '6:00 AM – 11:00 PM' },
    { day: 'Saturday – Sunday', time: '6:00 AM – 10:00 PM' }
  ],
  social: { instagram: '', facebook: '', youtube: '' }
};

// Facilities — icon names lucide ke hain (JS se inject hote hain)
const FACILITIES = [
  { icon: 'wifi', title: 'High-Speed Wi-Fi', desc: 'Reliable fibre internet for online classes and research.' },
  { icon: 'snowflake', title: 'Air Conditioned', desc: 'Comfortable study environment throughout the year.' },
  { icon: 'lamp-desk', title: 'Individual Desks', desc: 'Personal desks with dedicated reading lamps.' },
  { icon: 'battery-charging', title: 'Charging Points', desc: 'Power socket at every seat.' },
  { icon: 'book-open', title: 'Reference Library', desc: 'Competitive exam books and newspapers.' },
  { icon: 'shield-check', title: 'CCTV Secured', desc: '24×7 monitored premises.' },
  { icon: 'coffee', title: 'Filtered Water', desc: 'RO drinking water facility.' },
  { icon: 'lock', title: 'Locker Facility', desc: 'Secure storage for personal belongings.' }
];

const PLANS = [
  {
    id: 'monthly', name: 'Monthly', duration: '30 days',
    price: '₹ —', popular: false,
    features: ['Dedicated seat', 'Wi-Fi + AC', 'Charging point', 'Locker access']
  },
  {
    id: 'quarterly', name: 'Quarterly', duration: '90 days',
    price: '₹ —', popular: true,
    features: ['Dedicated seat', 'Wi-Fi + AC', 'Charging point', 'Locker access', 'Priority seat selection', '2 guest passes / month']
  },
  {
    id: 'custom', name: 'Custom', duration: 'Flexible',
    price: 'Talk to us', popular: false,
    features: ['Custom duration', 'Group / bulk options', 'Flexible timings']
  }
];

const FAQS = [
  { q: 'What are the library timings?', a: 'Please check the Contact page — timings are updated by the library owner.' },
  { q: 'How do I book a seat?', a: 'Register as a student and reserve your seat from the student dashboard (coming soon).' },
  { q: 'Is there a trial visit?', a: 'Yes — use the Book a Visit page to request a free trial.' },
  { q: 'What payment methods are accepted?', a: 'Cash at the counter and online payment (when enabled).' }
];