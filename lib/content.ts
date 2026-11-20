export const site = {
  name: 'Trained by Dorsa',
  shortName: 'Dorsa',
  tagline: 'Premium personal training tailored to your goals',
  description:
    'Premium personal training in Tysons Corner, VA and live virtual 1:1 training with Dorsa, an ACE Certified Personal Trainer. Strength, fat loss, body recomposition and lasting habits, with a 2x/week minimum.',
  url: 'https://www.trainedbydorsa.com',
  location: 'Tysons Corner, VA',
  instagram: 'https://www.instagram.com/trainedbydorsa/',
  instagramHandle: '@trainedbydorsa',
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'daramideh@gmail.com',
  credit: { label: 'NV Digital Consulting', href: 'https://nvdigitalconsulting.com' },
} as const;

export const navLinks = [
  { label: 'Training', href: '/#services' },
  { label: 'Results', href: '/#transformations' },
  { label: 'About', href: '/#about' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'FAQ', href: '/#faq' },
] as const;

export const hero = {
  eyebrow: 'Tysons Corner, VA  ·  Virtual 1:1',
  headline: 'Premium personal training,',
  headlineAccent: 'tailored to you.',
  subheadline:
    'In-person training in Tysons Corner, VA and live virtual 1:1 training, built around your goals, your lifestyle, and long-term success.',
  primaryCta: 'Apply for Coaching',
  secondaryCta: 'View Pricing',
  imageAlt: 'Dorsa, personal trainer, holding a low lunge in black training wear in the studio',
  highlights: [
    { label: 'In-Person', value: 'Tysons Corner, VA' },
    { label: 'Virtual', value: 'Live 1:1, anywhere' },
    { label: 'Certified', value: 'ACE Personal Trainer' },
  ],
} as const;

export const focusAreas = [
  'Strength',
  'Fat loss',
  'Body recomposition',
  'Consistency',
  'Lasting habits',
  'Prenatal & postpartum',
] as const;

export const approach = {
  eyebrow: 'The Approach',
  statement: 'Coaching that meets you where you are, and challenges you to push',
  statementAccent: '1% further each day.',
  body: 'Whether you train in person or virtually, every program is built for you, not a template. Training has a 2x/week minimum, with support that keeps you consistent and confident.',
  imageAlt: 'Dorsa standing in black training wear with one hand behind her head',
  pillars: [
    {
      title: 'Form correction',
      body: 'Real-time cues on every movement, so you train safely and get more out of each rep.',
    },
    {
      title: 'Structured workouts',
      body: 'A clear plan built around your goals, so you never have to guess what to do in the gym.',
    },
    {
      title: 'Accountability',
      body: 'A consistent 2x/week rhythm and a coach in your corner, even on busy weeks.',
    },
    {
      title: 'Direct coaching support',
      body: 'One-on-one attention from Dorsa, adjusted around your schedule, travel, and life.',
    },
  ],
} as const;

export const pricing = {
  eyebrow: 'Training & Pricing',
  title: 'Two paths.',
  titleAccent: 'One goal.',
  intro:
    'Personalized coaching that fits your life. All training has a 2x/week minimum, and sessions are billed based on how many you train each month.',
} as const;

export const services = [
  {
    id: 'in-person',
    title: 'In-Person Training',
    location: 'Tysons Corner, VA',
    tiers: [
      { name: '1:1 Training', detail: 'Private session', price: '$140', unit: '/ hour' },
      { name: 'Partner Training', detail: 'Train with a partner', price: '$90', unit: '/ person' },
      { name: 'Semi-Private', detail: 'Groups of 3–4', price: '$45', unit: '/ person' },
    ],
    minimum: '2x / week minimum',
    description:
      'Premium in-person training with form correction, accountability, structured workouts, and direct coaching support. Train 1:1, with a partner, or in a semi-private group. Best for clients who want hands-on guidance.',
    note: 'Nutrition counseling is not included with in-person sessions.',
    cta: 'Apply for In-Person',
    applyHref: '/#apply?interest=in-person',
  },
  {
    id: 'virtual',
    title: 'Virtual Training',
    location: 'Remote · Live 1:1',
    tiers: [
      { name: '30-Minute Session', detail: 'Live 1:1 via video', price: '$65', unit: '/ session' },
      { name: '45-Minute Session', detail: 'Live 1:1 via video', price: '$95', unit: '/ session' },
    ],
    minimum: '2x / week minimum',
    description:
      'Premium 1:1 training wherever you are, with form correction, accountability, structured workouts, and direct coaching support. Best for clients who want real-time guidance from home or while traveling.',
    note: 'Nutrition counseling is not included with virtual sessions.',
    cta: 'Apply for Virtual',
    applyHref: '/#apply?interest=virtual',
  },
] as const;

export const transformations = {
  eyebrow: 'Client Results',
  title: 'Your journey.',
  titleAccent: 'Your results.',
  body: 'The results you see here come from consistency, hard work, and personalized 1:1 coaching. No two journeys are the same, and each one is guided with intention, support, and a focus on long-term success.',
  images: [
    { src: '/images/Transformation5.jpg', alt: 'Client transformation 1' },
    { src: '/images/Transformation3.JPG', alt: 'Client transformation 2' },
    { src: '/images/IMG_4397.JPG', alt: 'Client transformation 3' },
    { src: '/images/IMG_4712.png', alt: 'Client transformation 4' },
    { src: '/images/IMG_4713.JPG', alt: 'Client transformation 5' },
    { src: '/images/Transformation6.jpg', alt: 'Client transformation 6' },
  ],
} as const;

export const about = {
  eyebrow: 'About Dorsa',
  title: 'Meet',
  titleAccent: 'Dorsa.',
  quote: "True transformation isn't just physical; it's mental and emotional too.",
  paragraphs: [
    'My passion for fitness started over a decade ago, when I was juggling school and corporate life. My own struggle with burnout led me to prioritize health, and it shaped how I coach today.',
    "I meet you where you are while challenging you to push just 1% further each day. My goal is to help you build lasting habits that support every aspect of your well-being while getting the results you want, whether that's fat loss, body recomposition, strength, or consistency.",
  ],
  credentials: [
    'ACE Certified Personal Trainer',
    'ACE Certified Prenatal & Postpartum',
  ],
  imageAlt: 'Dorsa standing with a hand on her hip in grey training wear',
  insetAlt: 'Dorsa looking over her shoulder in black training wear',
} as const;

export const reviews = {
  eyebrow: 'Client Reviews',
  title: 'In their',
  titleAccent: 'own words.',
  items: [
    {
      highlight: 'Working one on one with Dorsa has given me my confidence back.',
      quote:
        "Dorsa is the BEST trainer! One of the nicest most easily approachable humans I've ever met that also WANTS to see you succeed!! When I first met her I said please help me look like you! I came to her defeated after years of trial and error with diet and different types of exercises classes and nothing was working for me. I thought looking toned and being thin meant eating less and exercising more. Working one on one with Dorsa has given me my confidence back and giving me the body I want, I've been able to eat more and lose body fat where before I never thought was possible! Teaching me how to actually fuel my body to support my goals! I would recommend her to anyone I know, THANK YOU DORSA!! She is a QUEEN!!!!",
      author: 'Sonal S.',
      rating: 5,
    },
    {
      highlight: 'Dorsa truly cares about her clients!',
      quote:
        "I've been working with Dorsa as my personal trainer for a few months now, and she's been amazing! Dorsa truly cares about her clients! She takes the time to understand their goals and tailors their workouts to help them achieve those results. I always look forward to our sessions and leave feeling energized and ready to take on the day. Beyond just training, we also discuss nutrition, mental health, and exercises I can do outside of our sessions. I've noticed a significant positive shift in my lifestyle, and I can't thank her enough for all her support and guidance!",
      author: 'Lily J.',
      rating: 5,
    },
    {
      highlight: 'The results have been incredible and I finally feel confident in my routine.',
      quote:
        "Working with Dorsa has been such a game changer. She listens, pushes you in the best way, and makes the process feel doable even on busy weeks. I've learned how to train smarter, fuel my body properly, and stay consistent without burning out. The results have been incredible and I finally feel confident in my routine. I'm so grateful for her guidance and positive energy!",
      author: 'Carmen A.',
      rating: 5,
    },
  ],
} as const;

export const coachingFit = {
  eyebrow: 'Is It For You?',
  title: 'This coaching is for you if…',
  bullets: [
    'You want structure and accountability',
    'You are tired of guessing what to do in the gym',
    'You want a realistic plan that fits your lifestyle',
    'You want support with workouts, habits, and consistency',
    'You are ready for a personalized approach instead of generic programs',
  ],
  cta: 'Find Your Coaching Fit',
  imageAlt: 'Dorsa smiling mid-movement with her arms raised',
} as const;

export const application = {
  eyebrow: 'Apply',
  title: 'Start your',
  titleAccent: 'coaching application.',
  intro:
    'Tell Dorsa a little about yourself and your goals. This takes just a few minutes, and there is no pressure to commit until you are ready.',
  steps: [
    {
      title: 'Apply',
      body: 'Share your goals, training history, and the program you are interested in.',
    },
    {
      title: 'Review',
      body: 'Dorsa reviews your answers to make sure the program is the right fit for you.',
    },
    {
      title: 'Next steps',
      body: 'She reaches out with next steps. No pressure to commit until you are ready.',
    },
  ],
  privacyNote:
    'Your information is private and will only be used to review your coaching application and contact you about next steps.',
  successTitle: 'Application received.',
  successMessage:
    'Thank you for applying! Dorsa will review your answers and reach out soon with next steps.',
  errorMessage:
    'Something went wrong while submitting your application. Please try again, or email Dorsa directly at',
  pricingAcknowledgement: {
    'in-person':
      'In-person training in Tysons Corner, VA is $140/hr for 1:1, $90/person for partner training, or $45/person for semi-private training (3-4 people), with a 2x/week minimum. Please continue only if this works for your budget, schedule, and location.',
    virtual:
      'Virtual 1:1 training is $65 for a 30-minute session or $95 for a 45-minute session, with a 2x/week minimum. Please continue only if this works for your budget and schedule.',
  },
  pricingCheckbox: {
    'in-person':
      'I understand the in-person pricing above, the 2x/week minimum, and that sessions are in Tysons Corner, VA.',
    virtual: 'I understand the virtual pricing above and the 2x/week minimum.',
  },
} as const;

export const faq = {
  eyebrow: 'FAQ',
  title: 'Questions,',
  titleAccent: 'answered.',
  items: [
    {
      question: 'What is the difference between in-person and virtual training?',
      paragraphs: [
        'In-person training is in Tysons Corner, VA, and you can train 1:1, with a partner, or in a semi-private group of 3-4 people. Virtual training is 1:1 and happens live from wherever you are, in 30 or 45-minute sessions.',
        "Both are fully customized to your goals, with a 2x/week minimum. They're great for accountability and sticking to a program. Workouts outside of training days, and nutrition counseling, are not included.",
      ],
    },
    {
      question: 'How long does it take to see results?',
      paragraphs: [
        'Most clients will see noticeable change within the first 6-8 weeks of consistency but lasting transformations take time to achieve. Results will vary depending on how consistent nutrition, training, sleep, etc. is.',
      ],
    },
    {
      question: 'What is your pricing like?',
      paragraphs: [
        'In-person training in Tysons Corner, VA is $140/hr for 1:1, $90/person for partner training, and $45/person for semi-private training (3-4 people). Virtual 1:1 training is $65 for 30 minutes or $95 for 45 minutes. All training has a 2x/week minimum, and sessions are billed based on how many you train each month.',
      ],
    },
    {
      question: 'What if I need to travel or have a busy week?',
      paragraphs: [
        "Your plan is designed to fit into your lifestyle and schedule. We'll work together to adjust training and/or nutrition if something comes up or if you have to travel.",
      ],
    },
  ],
} as const;

export const finalCta = {
  eyebrow: 'Your next step',
  title: 'Ready to invest in',
  titleAccent: 'yourself?',
  body: 'Your goals deserve a plan built just for you. Take the first step, and Dorsa will review your application and reach out with next steps.',
  cta: 'Start Your Application',
  imageAlt: 'Dorsa in black training wear, looking over her shoulder',
} as const;
