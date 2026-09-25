export const site = {
  name: 'Dorsa Wellness',
  tagline: 'Premium personal training tailored to your goals',
  url: 'https://www.dorsawellness.com',
  instagram: 'https://www.instagram.com/dorsawellness/?hl=en',
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'daramideh@gmail.com',
} as const;

export const hero = {
  headline: 'Premium personal training tailored to your goals',
  subheadline:
    'In-person and virtual 1:1 training in Tyson\'s Corner, VA (2x/week minimum), or fully online coaching, built around your goals, lifestyle, and long-term success.',
  primaryCta: 'Start Your Coaching Application',
  secondaryCta: 'View Transformations',
} as const;

export const trustIntro = {
  title: 'Coaching that meets you where you are',
  body: 'Whether you train in person, virtually, or online, every program is built for you, not a template. In-person and virtual 1:1 training has a 2x/week minimum. Online coaching stays flexible for busy schedules, with support that keeps you consistent and confident.',
} as const;

export const services = {
  inPerson: {
    title: 'In-Person & Virtual Training',
    location: "Tyson's Corner, VA / Virtual",
    price: '$140/hr',
    minimum: '2x/week minimum',
    description:
      'Premium 1:1 training, in person or virtual, with form correction, accountability, structured workouts, and direct coaching support. Sessions have a 2x/week minimum. Best for clients who want real-time guidance.',
    note: 'Nutrition counseling is not included with in-person or virtual sessions.',
    cta: 'Apply for 1:1 Training',
    applyHref: '/#apply?interest=in-person',
  },
  online: {
    title: 'Online Coaching',
    description:
      'App-based workouts, nutrition guidance, habit tracking, check-ins, and ongoing support, built to fit your lifestyle and schedule.',
    caption:
      'Online coaching is for women who are tired of yo-yo dieting, quick fixes, and are looking to commit to a healthy lifestyle that gets you long-lasting results.',
    price: '$399/month',
    cta: 'Apply for Online Coaching',
    applyHref: '/#apply?interest=online',
  },
} as const;

export const transformations = {
  title: 'Transformations',
  subtitle: 'Your Journey. Your Results.',
  body: 'The results you see here come from consistency, hard work, and personalized 1:1 coaching. No two journeys are the same, and each one is guided with intention, support, and a focus on long-term success.',
  images: [
    { src: '/images/transformation1.JPG', alt: 'Client transformation 1' },
    { src: '/images/Transformation3.JPG', alt: 'Client transformation 2' },
    { src: '/images/IMG_4397.JPG', alt: 'Client transformation 3' },
    { src: '/images/IMG_4712.png', alt: 'Client transformation 4' },
    { src: '/images/IMG_4713.JPG', alt: 'Client transformation 5' },
  ],
} as const;

export const about = {
  title: 'About Dorsa',
  body: `My passion for fitness started over a decade ago, when I was juggling school and corporate life. My own struggle with burnout led me to prioritize health, and it shaped how I coach today.

I meet you where you are while challenging you to push just 1% further each day. True transformation isn't just physical; it's mental and emotional too. My goal is to help you build lasting habits that support every aspect of your well-being while getting the results you want, whether that's fat loss, body recomposition, strength, or consistency.`,
  credentials: [
    'ACE Certified Personal Trainer',
    'ACE Certified Prenatal & Postpartum',
  ],
  image: '/images/about-dorsa.png',
} as const;

export const reviews = {
  title: 'Client Reviews',
  items: [
    {
      quote:
        "Dorsa is the BEST trainer! One of the nicest most easily approachable humans i've ever met that also WANTS to see you succeed!! When I first met her I said please help me look like you! I came to her defeated after years of trial and error with diet and different types of exercises classes and nothing was working for me. I though looking toned and being thin meant eating less and exercising more. Working one on one with dorsa has given me my confidence back and giving me the body I want, I've been able to eat more and lose body fat where before I never thought was possible! Teaching me how to actually fuel my body to support my goals! I would recommend her to anyone I know, THANK YOU DORSA!! She is a QUEEN!!!!",
      author: 'Sonal S.',
      rating: 5,
    },
    {
      quote:
        "I've been working with Dorsa as my personal trainer for a few months now, and she's been amazing! Dorsa truly cares about her clinets! She takes the time to understand their goals and tailors their workouts to help them achieve those results. I always look forward to our sessions and leave feeling energized and ready to take on the day. Beyond just training, we also discuss nutrition, mental health, and exercises I can do outside of our sessions. I've noticed a significant positive shift in my lifestyle, and I can't thank her enough for all her support and guidance!",
      author: 'Lily J.',
      rating: 5,
    },
    {
      quote:
        'Working with Dorsa has been such a game changer. She listens, pushes you in the best way, and makes the process feel doable even on busy weeks. I\'ve learned how to train smarter, fuel my body properly, and stay consistent without burning out. The results have been incredible and I finally feel confident in my routine. I\'m so grateful for her guidance and positive energy!',
      author: 'Carmen A.',
      rating: 5,
    },
  ],
} as const;

export const coachingFit = {
  title: 'This coaching is for you if...',
  bullets: [
    'You want structure and accountability',
    'You are tired of guessing what to do in the gym',
    'You want a realistic plan that fits your lifestyle',
    'You want support with workouts, habits, and consistency',
    'You are ready for a personalized approach instead of generic programs',
  ],
  cta: 'Find Your Coaching Fit',
} as const;

export const application = {
  title: 'Start Your Coaching Application',
  intro:
    'Tell Dorsa a little about yourself and your goals. This takes just a few minutes, and there is no pressure to commit until you are ready.',
  privacyNote:
    'Your information is private and will only be used to review your coaching application and contact you about next steps.',
  successMessage:
    'Thank you for applying! Dorsa will review your answers and reach out soon with next steps.',
  errorMessage:
    'Something went wrong while submitting your application. Please try again, or email Dorsa directly at',
  inPersonAcknowledgement:
    "In-person and virtual 1:1 training is $140/hr in Tyson's Corner, VA or virtual, with a 2x/week minimum. Please continue only if this works for your budget, schedule, and location.",
  inPersonCheckbox:
    "I understand that in-person and virtual 1:1 training is $140/hr, with a 2x/week minimum, in Tyson's Corner, VA or virtual.",
  onlineMessage:
    'Online coaching is $399/month. Dorsa will review your application and follow up with next steps.',
} as const;

export const faq = {
  title: 'FAQ',
  items: [
    {
      question: 'What is the difference between in-person/virtual training and online coaching?',
      paragraphs: [
        "In-person and virtual training is 1:1 coaching for those who want hands-on assistance. Workouts are fully customized to your goals, with a 2x/week minimum. Sessions are in Tyson's Corner, VA or virtual. It's great for accountability and sticking to a program. Workouts outside of training days, and nutrition counseling, are not included.",
        "Online coaching includes a fully customized program with workouts, nutrition, habit tracking, and weekly check-ins. This is a more hands-off approach where you'll receive your full program but you will need to make sure you show up for yourself daily. This is great for those with experience in the gym but need help in all areas of their fitness goals.",
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
        "In-person and virtual 1:1 training is $140/hr in Tyson's Corner, VA or virtual, with a 2x/week minimum. Sessions are billed based on how many you train each month.",
        'Online coaching is $399/month and includes a fully customized program with workouts, nutrition, habit tracking, and weekly check-ins.',
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
  title: 'Ready to invest in yourself?',
  body: 'Your goals deserve a plan built just for you. Take the first step, and Dorsa will review your application and reach out with next steps.',
  cta: 'Start Your Coaching Application',
} as const;

export const navLinks = [
  { label: 'Services', href: '/#services' },
  { label: 'Transformations', href: '/#transformations' },
  { label: 'About', href: '/#about' },
  { label: 'FAQ', href: '/#faq' },
] as const;
