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
    'Personalized 1:1 coaching, in-person in Tyson\'s Corner, VA or fully online, built around your goals, lifestyle, and long-term success.',
  primaryCta: 'Start Your Coaching Application',
  secondaryCta: 'View Transformations',
} as const;

export const trustIntro = {
  title: 'Coaching that meets you where you are',
  body: 'Whether you train in person or online, every program is built for you, not a template. Dorsa offers hands-on guidance for local clients and flexible online coaching for busy schedules, with support that keeps you consistent and confident.',
} as const;

export const services = {
  inPerson: {
    title: 'In-Person Coaching',
    location: "Tyson's Corner, VA",
    price: '$140/hr',
    description:
      'Premium hands-on 1:1 training with form correction, accountability, structured workouts, and direct coaching support. Best for clients who want in-person structure and real-time guidance.',
    note: 'Nutrition counseling is not included with in-person sessions.',
    cta: 'Apply for In-Person Coaching',
    applyHref: '/#apply?interest=in-person',
  },
  online: {
    title: 'Online Coaching',
    description:
      'App-based workouts, nutrition guidance, habit tracking, check-ins, and ongoing support, built to fit your lifestyle and schedule.',
    pricingNote: 'Pricing is customized based on your goals and level of support.',
    pricingSubnote:
      'Pricing depends on your goals, lifestyle, and level of support.',
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
    { src: '/images/Transformation4.png', alt: 'Client transformation 6', cover: true },
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
  image: '/images/ovalimage.JPG',
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
    'In-person training is $140/hr and takes place in McLean, VA. Please continue only if this works for your budget and location.',
  inPersonCheckbox:
    'I understand that in-person training is $140/hr and takes place in McLean, VA.',
  onlineMessage:
    'Online coaching is customized based on your goals, lifestyle, and level of support. Dorsa will review your application and follow up with next steps.',
} as const;

export const faq = {
  title: 'FAQ',
  items: [
    {
      question: 'What is the difference b/w in-person training and online coaching?',
      paragraphs: [
        "In-person training is for those who want hands-on assistance in their training. Your workouts are fully customized to your goals. It's great for those who need accountability getting to the gym & sticking to their program. This is training in-person only, workouts outside of training days as well as nutrition counseling is excluded.",
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
        "In-person training is $140/hr in Tyson's Corner, VA and is billed based on how many sessions you'd like to train for the month.",
        'Online coaching is billed monthly with customized pricing based on your goals and level of support. Details are shared after your application is reviewed.',
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
