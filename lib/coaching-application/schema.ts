export type CoachingInterest = 'online' | 'in-person';

export type ReadyToChange = 'yes' | 'no';

export type ReadyToInvest = 'yes' | 'no';

export type CoachingApplicationInput = {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  instagram?: string;
  coachingInterest: CoachingInterest;
  fitnessGoal: string;
  exerciseHistory: string;
  dietaryRestrictions: string;
  readyToChange: ReadyToChange;
  readyToInvest: ReadyToInvest;
  inPersonPricingAcknowledged?: boolean;
  websiteUrl?: string;
};

export type CoachingApplicationPayload = CoachingApplicationInput & {
  submittedAt: string;
  sourcePage: 'Website application form';
};

export type FieldErrors = Partial<Record<keyof CoachingApplicationInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateApplication(
  data: CoachingApplicationInput
): { ok: true; data: CoachingApplicationInput } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};

  if (!data.fullName?.trim()) errors.fullName = 'Full name is required';
  if (!data.email?.trim()) errors.email = 'Email is required';
  else if (!EMAIL_RE.test(data.email.trim())) errors.email = 'Enter a valid email';

  if (!data.phone?.trim()) errors.phone = 'Phone number is required';
  else if (data.phone.replace(/\D/g, '').length < 10)
    errors.phone = 'Enter a valid phone number';

  if (!data.age?.trim()) errors.age = 'Age is required';
  else if (!/^\d+$/.test(data.age.trim()) || Number(data.age) < 13 || Number(data.age) > 120)
    errors.age = 'Enter a valid age';

  if (!data.coachingInterest) errors.coachingInterest = 'Please select a program';
  if (!data.fitnessGoal?.trim()) errors.fitnessGoal = 'Please describe your main fitness goal';
  if (!data.exerciseHistory?.trim())
    errors.exerciseHistory = 'Please share your exercise history and any injuries';
  if (!data.dietaryRestrictions?.trim())
    errors.dietaryRestrictions = 'Please list dietary restrictions (or write "None")';

  if (data.coachingInterest === 'in-person' && !data.inPersonPricingAcknowledged) {
    errors.inPersonPricingAcknowledged =
      'Please confirm you understand the pricing and location';
  }

  if (!data.readyToChange) errors.readyToChange = 'Please select an option';
  if (!data.readyToInvest) errors.readyToInvest = 'Please select an option';

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data };
}

export const COACHING_INTEREST_LABELS: Record<CoachingInterest, string> = {
  online: 'Online coaching',
  'in-person': "In-person training (Tyson's corner, VA / Virtual)",
};

export const READY_TO_CHANGE_LABELS: Record<ReadyToChange, string> = {
  yes: "Yes, I'm ready to commit 100% to myself and the program",
  no: "No, I can't commit 100%.",
};

export const READY_TO_INVEST_LABELS: Record<ReadyToInvest, string> = {
  yes: 'Yes, I am ready to invest in my physical and mental health',
  no: "No, I'm not ready to invest in myself.",
};

export const READY_TO_CHANGE_QUESTION =
  'This program is only for individuals who feel ready to truly make a change in their health & fitness and are ready to see results. Are you ready to make change?';

export const READY_TO_INVEST_QUESTION =
  'Are you willing and currently able to invest, financially, into a 1:1 coaching program to achieve your fitness goals?';
