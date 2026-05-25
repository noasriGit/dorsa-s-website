'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { application, site } from '@/lib/content';
import {
  READY_TO_CHANGE_QUESTION,
  READY_TO_INVEST_QUESTION,
  type CoachingApplicationInput,
  type CoachingInterest,
  type ReadyToChange,
  type ReadyToInvest,
} from '@/lib/coaching-application/schema';
import { scrollToApplyForm } from '@/lib/scroll';
import Button from '../ui/Button';
import FormProgress from './FormProgress';

const TOTAL_STEPS = 3;

const PROGRAM_OPTIONS: { value: CoachingInterest; label: string }[] = [
  { value: 'online', label: 'Online coaching' },
  { value: 'in-person', label: 'In-person training (McLean, VA)' },
];

const READY_TO_CHANGE_OPTIONS: { value: ReadyToChange; label: string }[] = [
  { value: 'yes', label: "Yes, I'm ready to commit 100% to myself and the program" },
  { value: 'no', label: "No, I can't commit 100%." },
];

const READY_TO_INVEST_OPTIONS: { value: ReadyToInvest; label: string }[] = [
  { value: 'yes', label: 'Yes, I am ready to invest in my physical and mental health' },
  { value: 'no', label: "No, I'm not ready to invest in myself." },
];

const emptyForm: CoachingApplicationInput = {
  fullName: '',
  email: '',
  phone: '',
  age: '',
  instagram: '',
  coachingInterest: '' as CoachingInterest,
  fitnessGoal: '',
  exerciseHistory: '',
  dietaryRestrictions: '',
  readyToChange: '' as ReadyToChange,
  readyToInvest: '' as ReadyToInvest,
  inPersonPricingAcknowledged: false,
  websiteUrl: '',
};

function getInterestFromUrl(): CoachingInterest | null {
  if (typeof window === 'undefined') return null;

  let interest = new URLSearchParams(window.location.search).get('interest');

  if (!interest && window.location.hash.includes('?')) {
    const hashQuery = window.location.hash.split('?')[1];
    if (hashQuery) {
      interest = new URLSearchParams(hashQuery).get('interest');
    }
  }

  if (interest === 'in-person' || interest === 'online') return interest;
  return null;
}

function validateStep(
  step: number,
  data: CoachingApplicationInput
): Partial<Record<keyof CoachingApplicationInput, string>> {
  const errors: Partial<Record<keyof CoachingApplicationInput, string>> = {};
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (step === 1) {
    if (!data.fullName.trim()) errors.fullName = 'Full name is required';
    if (!data.email.trim()) errors.email = 'Email is required';
    else if (!emailRe.test(data.email.trim())) errors.email = 'Enter a valid email';
    if (!data.phone.trim()) errors.phone = 'Phone number is required';
    else if (data.phone.replace(/\D/g, '').length < 10)
      errors.phone = 'Enter a valid phone number';
    if (!data.age.trim()) errors.age = 'Age is required';
    else if (!/^\d+$/.test(data.age.trim()) || Number(data.age) < 13 || Number(data.age) > 120)
      errors.age = 'Enter a valid age';
  }

  if (step === 2) {
    if (!data.coachingInterest) errors.coachingInterest = 'Please select a program';
    if (!data.fitnessGoal.trim()) errors.fitnessGoal = 'Please describe your main fitness goal';
    if (!data.exerciseHistory.trim())
      errors.exerciseHistory = 'Please share your exercise history and any injuries';
    if (!data.dietaryRestrictions.trim())
      errors.dietaryRestrictions = 'Please list dietary restrictions (or write "None")';
    if (data.coachingInterest === 'in-person' && !data.inPersonPricingAcknowledged) {
      errors.inPersonPricingAcknowledged =
        'Please confirm you understand the pricing and location';
    }
  }

  if (step === 3) {
    if (!data.readyToChange) errors.readyToChange = 'Please select an option';
    if (!data.readyToInvest) errors.readyToInvest = 'Please select an option';
  }

  return errors;
}

export default function CoachingForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<CoachingApplicationInput>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof CoachingApplicationInput, string>>>(
    {}
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const skipStepScrollRef = useRef(true);

  useEffect(() => {
    const interest = getInterestFromUrl();
    if (interest) {
      setForm((prev) => ({ ...prev, coachingInterest: interest }));
      setStep(2);
    }
  }, []);

  useEffect(() => {
    if (skipStepScrollRef.current) {
      skipStepScrollRef.current = false;
      return;
    }

    requestAnimationFrame(() => scrollToApplyForm());
  }, [step]);

  const update = useCallback(
    <K extends keyof CoachingApplicationInput>(key: K, value: CoachingApplicationInput[K]) => {
      setForm((prev) => {
        const next = { ...prev, [key]: value };
        if (key === 'coachingInterest' && value !== 'in-person') {
          next.inPersonPricingAcknowledged = false;
        }
        return next;
      });
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    },
    []
  );

  const goNext = () => {
    const stepErrors = validateStep(step, form);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async () => {
    const stepErrors = validateStep(3, form);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setSubmitting(true);
    setSubmitError(false);

    try {
      const res = await fetch('/api/coaching-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        setSubmitError(true);
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8 fade-in">
        <div className="w-14 h-14 rounded-full bg-[var(--color-taupe)]/30 flex items-center justify-center mx-auto mb-6">
          <svg className="w-7 h-7 text-[var(--color-charcoal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-lg text-[var(--color-charcoal)] font-light leading-relaxed max-w-md mx-auto">
          {application.successMessage}
        </p>
      </div>
    );
  }

  return (
    <div>
      <FormProgress currentStep={step} totalSteps={TOTAL_STEPS} />

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="websiteUrl">Website</label>
        <input
          id="websiteUrl"
          name="websiteUrl"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.websiteUrl ?? ''}
          onChange={(e) => update('websiteUrl', e.target.value)}
        />
      </div>

      {step === 1 && (
        <div className="space-y-5 fade-in">
          <Field label="Full Name" htmlFor="fullName" error={errors.fullName} required>
            <input
              id="fullName"
              className="form-input"
              value={form.fullName}
              onChange={(e) => update('fullName', e.target.value)}
              autoComplete="name"
            />
          </Field>
          <Field label="Email" htmlFor="email" error={errors.email} required>
            <input
              id="email"
              type="email"
              className="form-input"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              autoComplete="email"
            />
          </Field>
          <Field label="Phone Number" htmlFor="phone" error={errors.phone} required>
            <input
              id="phone"
              type="tel"
              className="form-input"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              autoComplete="tel"
            />
          </Field>
          <Field label="How old are you?" htmlFor="age" error={errors.age} required>
            <input
              id="age"
              type="number"
              min={13}
              max={120}
              className="form-input"
              value={form.age}
              onChange={(e) => update('age', e.target.value)}
              inputMode="numeric"
            />
          </Field>
          <Field label="Instagram handle" htmlFor="instagram" optional>
            <input
              id="instagram"
              className="form-input"
              placeholder="@username"
              value={form.instagram ?? ''}
              onChange={(e) => update('instagram', e.target.value)}
            />
          </Field>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5 fade-in">
          <fieldset>
            <legend className="form-label">
              Which program are you interested in?{' '}
              <span className="text-[var(--color-taupe)]">*</span>
            </legend>
            <div className="space-y-2 mt-2">
              {PROGRAM_OPTIONS.map(({ value, label }) => (
                <label
                  key={value}
                  className="form-option"
                >
                  <input
                    type="radio"
                    name="coachingInterest"
                    value={value}
                    checked={form.coachingInterest === value}
                    onChange={() => update('coachingInterest', value)}
                    className="accent-[var(--color-taupe)]"
                  />
                  <span className="text-sm text-[var(--color-charcoal)]">{label}</span>
                </label>
              ))}
            </div>
            {errors.coachingInterest && (
              <p className="form-error">{errors.coachingInterest}</p>
            )}
          </fieldset>

          {form.coachingInterest === 'in-person' && (
            <div className="rounded-xl bg-[var(--color-taupe)]/15 border border-[var(--color-taupe)]/30 p-4 space-y-4">
              <p className="text-sm text-[var(--color-charcoal)] font-light leading-relaxed">
                {application.inPersonAcknowledgement}
              </p>
              <label className="form-option cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.inPersonPricingAcknowledged ?? false}
                  onChange={(e) => update('inPersonPricingAcknowledged', e.target.checked)}
                />
                <span className="text-sm text-[var(--color-charcoal)] leading-relaxed">
                  {application.inPersonCheckbox}
                </span>
              </label>
              {errors.inPersonPricingAcknowledged && (
                <p className="form-error">{errors.inPersonPricingAcknowledged}</p>
              )}
            </div>
          )}

          {form.coachingInterest === 'online' && (
            <div className="rounded-xl bg-[var(--color-cream)] border border-black/8 p-4">
              <p className="text-sm text-[var(--color-muted)] font-light leading-relaxed">
                {application.onlineMessage}
              </p>
            </div>
          )}

          <Field
            label="What is your main fitness goal? (ex: muscle gain, fat loss, balanced lifestyle, etc.)"
            htmlFor="fitnessGoal"
            error={errors.fitnessGoal}
            required
          >
            <textarea
              id="fitnessGoal"
              className="form-input min-h-[80px] resize-y"
              value={form.fitnessGoal}
              onChange={(e) => update('fitnessGoal', e.target.value)}
            />
          </Field>

          <Field
            label="Please share your exercise history as well as any injuries if applicable."
            htmlFor="exerciseHistory"
            error={errors.exerciseHistory}
            required
          >
            <textarea
              id="exerciseHistory"
              className="form-input min-h-[100px] resize-y"
              value={form.exerciseHistory}
              onChange={(e) => update('exerciseHistory', e.target.value)}
            />
          </Field>

          <Field
            label="Please list any dietary restrictions."
            htmlFor="dietaryRestrictions"
            error={errors.dietaryRestrictions}
            required
          >
            <textarea
              id="dietaryRestrictions"
              className="form-input min-h-[80px] resize-y"
              placeholder='Write "None" if not applicable'
              value={form.dietaryRestrictions}
              onChange={(e) => update('dietaryRestrictions', e.target.value)}
            />
          </Field>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 fade-in">
          <fieldset>
            <legend className="form-label leading-relaxed">
              {READY_TO_CHANGE_QUESTION}{' '}
              <span className="text-[var(--color-taupe)]">*</span>
            </legend>
            <div className="space-y-2 mt-3">
              {READY_TO_CHANGE_OPTIONS.map(({ value, label }) => (
                <label
                  key={value}
                  className="form-option"
                >
                  <input
                    type="radio"
                    name="readyToChange"
                    value={value}
                    checked={form.readyToChange === value}
                    onChange={() => update('readyToChange', value)}
                    className="accent-[var(--color-taupe)] mt-1"
                  />
                  <span className="text-sm text-[var(--color-charcoal)] leading-relaxed">{label}</span>
                </label>
              ))}
            </div>
            {errors.readyToChange && <p className="form-error">{errors.readyToChange}</p>}
          </fieldset>

          <fieldset>
            <legend className="form-label leading-relaxed">
              {READY_TO_INVEST_QUESTION}{' '}
              <span className="text-[var(--color-taupe)]">*</span>
            </legend>
            <div className="space-y-2 mt-3">
              {READY_TO_INVEST_OPTIONS.map(({ value, label }) => (
                <label
                  key={value}
                  className="form-option"
                >
                  <input
                    type="radio"
                    name="readyToInvest"
                    value={value}
                    checked={form.readyToInvest === value}
                    onChange={() => update('readyToInvest', value)}
                    className="accent-[var(--color-taupe)] mt-1"
                  />
                  <span className="text-sm text-[var(--color-charcoal)] leading-relaxed">{label}</span>
                </label>
              ))}
            </div>
            {errors.readyToInvest && <p className="form-error">{errors.readyToInvest}</p>}
          </fieldset>

          {submitError && (
            <div
              className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-[var(--color-charcoal)]"
              role="alert"
            >
              {application.errorMessage}{' '}
              <a
                href={`mailto:${site.contactEmail}`}
                className="underline text-[var(--color-charcoal)] font-medium"
              >
                {site.contactEmail}
              </a>
              .
            </div>
          )}
        </div>
      )}

      {step <= TOTAL_STEPS && !submitted && (
        <div className="form-nav">
          {step > 1 ? (
            <Button type="button" variant="ghost" onClick={goBack} className="form-nav-btn">
              Back
            </Button>
          ) : (
            <span className="hidden sm:block" aria-hidden />
          )}
          {step === TOTAL_STEPS ? (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="form-nav-btn"
            >
              {submitting ? 'Submitting…' : 'Submit Application'}
            </Button>
          ) : (
            <Button type="button" onClick={goNext} className="form-nav-btn">
              Continue
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  required,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="form-label leading-relaxed">
        {label}
        {required && <span className="text-[var(--color-taupe)]"> *</span>}
        {optional && (
          <span className="text-[var(--color-muted)] font-normal"> (optional)</span>
        )}
      </label>
      <div className="mt-2">{children}</div>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
