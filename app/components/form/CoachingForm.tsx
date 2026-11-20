'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { application, site } from '@/lib/content';
import {
  COACHING_INTEREST_LABELS,
  READY_TO_CHANGE_LABELS,
  READY_TO_CHANGE_QUESTION,
  READY_TO_INVEST_LABELS,
  READY_TO_INVEST_QUESTION,
  type CoachingApplicationInput,
  type CoachingInterest,
  type ReadyToChange,
  type ReadyToInvest,
} from '@/lib/coaching-application/schema';
import {
  APPLY_INTEREST_EVENT,
  getInterestFromHash,
  scrollToApplyForm,
  scrollToApplySuccess,
} from '@/lib/scroll';
import Button from '../ui/Button';
import FormProgress from './FormProgress';

const TOTAL_STEPS = 3;
const STEP_LABELS = ['About you', 'Program & goals', 'Commitment'] as const;

type Errors = Partial<Record<keyof CoachingApplicationInput, string>>;

const PROGRAM_OPTIONS = (Object.keys(COACHING_INTEREST_LABELS) as CoachingInterest[]).map(
  (value) => ({ value, label: COACHING_INTEREST_LABELS[value] })
);
const READY_TO_CHANGE_OPTIONS = (Object.keys(READY_TO_CHANGE_LABELS) as ReadyToChange[]).map(
  (value) => ({ value, label: READY_TO_CHANGE_LABELS[value] })
);
const READY_TO_INVEST_OPTIONS = (Object.keys(READY_TO_INVEST_LABELS) as ReadyToInvest[]).map(
  (value) => ({ value, label: READY_TO_INVEST_LABELS[value] })
);

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
  pricingAcknowledged: false,
  websiteUrl: '',
};

function getInterestFromUrl(): CoachingInterest | null {
  if (typeof window === 'undefined') return null;

  const interest =
    new URLSearchParams(window.location.search).get('interest') ??
    getInterestFromHash(window.location.hash);

  if (interest === 'in-person' || interest === 'virtual') return interest;
  return null;
}

const PROGRAM_SHORT_LABELS: Record<CoachingInterest, string> = {
  'in-person': 'In-Person Training · Tysons Corner, VA',
  virtual: 'Virtual Training · Live 1:1',
};

function validateStep(step: number, data: CoachingApplicationInput): Errors {
  const errors: Errors = {};
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
    if (data.coachingInterest && !data.pricingAcknowledged) {
      errors.pricingAcknowledged = 'Please confirm you understand the pricing and 2x/week minimum';
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
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const scrollAfterStepChangeRef = useRef(false);
  const stepRef = useRef<HTMLDivElement>(null);

  const update = useCallback(
    <K extends keyof CoachingApplicationInput>(key: K, value: CoachingApplicationInput[K]) => {
      setForm((prev) => {
        const next = { ...prev, [key]: value };
        if (key === 'coachingInterest' && value !== prev.coachingInterest) {
          next.pricingAcknowledged = false;
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

  // Pre-select the program from "Apply for …" links (on load or while on the page).
  // Contact details stay as step 1 so every application includes them.
  useEffect(() => {
    const syncFromUrl = () => {
      const fromUrl = getInterestFromUrl();
      if (fromUrl) update('coachingInterest', fromUrl);
    };
    syncFromUrl();

    const onInterest = (e: Event) => {
      const value = (e as CustomEvent<unknown>).detail;
      if (value === 'in-person' || value === 'virtual') update('coachingInterest', value);
    };
    window.addEventListener(APPLY_INTEREST_EVENT, onInterest);
    window.addEventListener('hashchange', syncFromUrl);
    return () => {
      window.removeEventListener(APPLY_INTEREST_EVENT, onInterest);
      window.removeEventListener('hashchange', syncFromUrl);
    };
  }, [update]);

  useEffect(() => {
    if (!scrollAfterStepChangeRef.current) return;
    scrollAfterStepChangeRef.current = false;
    requestAnimationFrame(() => {
      scrollToApplyForm();
      stepRef.current?.focus({ preventScroll: true });
    });
  }, [step]);

  useEffect(() => {
    if (!submitted) return;
    requestAnimationFrame(() => scrollToApplySuccess());
  }, [submitted]);

  const focusFirstError = (stepErrors: Errors) => {
    const first = Object.keys(stepErrors)[0];
    if (!first) return;
    requestAnimationFrame(() => {
      const el =
        document.getElementById(first) ??
        document.querySelector<HTMLElement>(`[name="${first}"]`);
      el?.focus();
    });
  };

  const goNext = () => {
    const stepErrors = validateStep(step, form);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      focusFirstError(stepErrors);
      return;
    }
    setErrors({});
    scrollAfterStepChangeRef.current = true;
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const goBack = () => {
    setErrors({});
    scrollAfterStepChangeRef.current = true;
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async () => {
    const stepErrors = validateStep(3, form);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      focusFirstError(stepErrors);
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
      <div
        id="apply-success"
        className="step-in flex min-h-[min(60vh,24rem)] flex-col items-start justify-center py-6"
        role="status"
      >
        <span className="flex h-14 w-14 items-center justify-center border border-white/30">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <p className="display-md mt-8">{application.successTitle}</p>
        <p className="lede mt-4 max-w-md">{application.successMessage}</p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (step === TOTAL_STEPS) handleSubmit();
        else goNext();
      }}
    >
      <FormProgress currentStep={step} totalSteps={TOTAL_STEPS} labels={STEP_LABELS} />

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

      <div ref={stepRef} tabIndex={-1} className="outline-none" aria-live="polite">
        {step === 1 && (
          <div key="step-1" className="step-in grid gap-7 sm:grid-cols-2 sm:gap-x-5">
            {form.coachingInterest && (
              <p className="label -mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-white/45 sm:col-span-2">
                <span>Selected program</span>
                <span aria-hidden className="h-px w-5 bg-white/30" />
                <span className="text-white">{PROGRAM_SHORT_LABELS[form.coachingInterest]}</span>
              </p>
            )}
            <Field label="Full name" htmlFor="fullName" error={errors.fullName} required className="sm:col-span-2">
              <input
                id="fullName"
                name="fullName"
                className="field-input"
                value={form.fullName}
                onChange={(e) => update('fullName', e.target.value)}
                autoComplete="name"
                {...errorProps('fullName', errors)}
              />
            </Field>
            <Field label="Email" htmlFor="email" error={errors.email} required>
              <input
                id="email"
                name="email"
                type="email"
                className="field-input"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                autoComplete="email"
                inputMode="email"
                {...errorProps('email', errors)}
              />
            </Field>
            <Field label="Phone number" htmlFor="phone" error={errors.phone} required>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="field-input"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                autoComplete="tel"
                {...errorProps('phone', errors)}
              />
            </Field>
            <Field label="How old are you?" htmlFor="age" error={errors.age} required>
              <input
                id="age"
                name="age"
                type="number"
                min={13}
                max={120}
                className="field-input"
                value={form.age}
                onChange={(e) => update('age', e.target.value)}
                inputMode="numeric"
                {...errorProps('age', errors)}
              />
            </Field>
            <Field label="Instagram handle" htmlFor="instagram" optional>
              <input
                id="instagram"
                name="instagram"
                className="field-input"
                placeholder="@username"
                value={form.instagram ?? ''}
                onChange={(e) => update('instagram', e.target.value)}
                autoCapitalize="none"
                autoCorrect="off"
              />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div key="step-2" className="step-in space-y-8">
            <fieldset>
              <legend className="field-label">
                Which program are you interested in? <RequiredMark />
              </legend>
              <div className="mt-3 grid gap-2.5">
                {PROGRAM_OPTIONS.map(({ value, label }, i) => (
                  <Choice
                    key={value}
                    type="radio"
                    name="coachingInterest"
                    id={i === 0 ? 'coachingInterest' : undefined}
                    checked={form.coachingInterest === value}
                    onChange={() => update('coachingInterest', value)}
                    invalid={Boolean(errors.coachingInterest)}
                  >
                    {label}
                  </Choice>
                ))}
              </div>
              {errors.coachingInterest && <p className="field-error">{errors.coachingInterest}</p>}
            </fieldset>

            {form.coachingInterest && (
              <div className="step-in border border-white/15 bg-white/[0.03] p-5 sm:p-6">
                <p className="label text-white/50">Pricing</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-white/80">
                  {application.pricingAcknowledgement[form.coachingInterest]}
                </p>
                <div className="mt-5">
                  <Choice
                    type="checkbox"
                    name="pricingAcknowledged"
                    id="pricingAcknowledged"
                    checked={form.pricingAcknowledged ?? false}
                    onChange={(checked) => update('pricingAcknowledged', checked)}
                    invalid={Boolean(errors.pricingAcknowledged)}
                  >
                    {application.pricingCheckbox[form.coachingInterest]}
                  </Choice>
                </div>
                {errors.pricingAcknowledged && (
                  <p className="field-error">{errors.pricingAcknowledged}</p>
                )}
              </div>
            )}

            <Field
              label="What is your main fitness goal?"
              hint="Ex: muscle gain, fat loss, balanced lifestyle, etc."
              htmlFor="fitnessGoal"
              error={errors.fitnessGoal}
              required
            >
              <textarea
                id="fitnessGoal"
                name="fitnessGoal"
                rows={3}
                className="field-input resize-y"
                value={form.fitnessGoal}
                onChange={(e) => update('fitnessGoal', e.target.value)}
                {...errorProps('fitnessGoal', errors)}
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
                name="exerciseHistory"
                rows={4}
                className="field-input resize-y"
                value={form.exerciseHistory}
                onChange={(e) => update('exerciseHistory', e.target.value)}
                {...errorProps('exerciseHistory', errors)}
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
                name="dietaryRestrictions"
                rows={3}
                className="field-input resize-y"
                placeholder='Write "None" if not applicable'
                value={form.dietaryRestrictions}
                onChange={(e) => update('dietaryRestrictions', e.target.value)}
                {...errorProps('dietaryRestrictions', errors)}
              />
            </Field>
          </div>
        )}

        {step === 3 && (
          <div key="step-3" className="step-in space-y-10">
            <fieldset>
              <legend className="field-label">
                {READY_TO_CHANGE_QUESTION} <RequiredMark />
              </legend>
              <div className="mt-4 grid gap-2.5">
                {READY_TO_CHANGE_OPTIONS.map(({ value, label }, i) => (
                  <Choice
                    key={value}
                    type="radio"
                    name="readyToChange"
                    id={i === 0 ? 'readyToChange' : undefined}
                    checked={form.readyToChange === value}
                    onChange={() => update('readyToChange', value)}
                    invalid={Boolean(errors.readyToChange)}
                  >
                    {label}
                  </Choice>
                ))}
              </div>
              {errors.readyToChange && <p className="field-error">{errors.readyToChange}</p>}
            </fieldset>

            <fieldset>
              <legend className="field-label">
                {READY_TO_INVEST_QUESTION} <RequiredMark />
              </legend>
              <div className="mt-4 grid gap-2.5">
                {READY_TO_INVEST_OPTIONS.map(({ value, label }, i) => (
                  <Choice
                    key={value}
                    type="radio"
                    name="readyToInvest"
                    id={i === 0 ? 'readyToInvest' : undefined}
                    checked={form.readyToInvest === value}
                    onChange={() => update('readyToInvest', value)}
                    invalid={Boolean(errors.readyToInvest)}
                  >
                    {label}
                  </Choice>
                ))}
              </div>
              {errors.readyToInvest && <p className="field-error">{errors.readyToInvest}</p>}
            </fieldset>

            {submitError && (
              <div className="border border-white/30 bg-white/[0.04] p-5 text-sm leading-relaxed text-white/85" role="alert">
                {application.errorMessage}{' '}
                <a href={`mailto:${site.contactEmail}`} className="text-white underline underline-offset-4">
                  {site.contactEmail}
                </a>
                .
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-10 flex flex-col-reverse gap-3 border-t border-white/10 pt-8 pb-[env(safe-area-inset-bottom,0px)] sm:flex-row sm:items-center sm:justify-between">
        {step > 1 ? (
          <Button type="button" variant="ghost" onClick={goBack} className="h-[3.25rem] sm:px-0">
            <span className="inline-flex items-center gap-3">
              <svg viewBox="0 0 20 10" className="h-2.5 w-5 rotate-180" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
                <path d="M0 5h18.5M14.5 1l4 4-4 4" />
              </svg>
              Back
            </span>
          </Button>
        ) : (
          <span className="hidden sm:block" aria-hidden />
        )}
        {step === TOTAL_STEPS ? (
          <Button type="submit" arrow disabled={submitting} className="w-full sm:w-auto">
            {submitting ? 'Submitting…' : 'Submit Application'}
          </Button>
        ) : (
          <Button type="submit" arrow className="w-full sm:w-auto">
            Continue
          </Button>
        )}
      </div>
    </form>
  );
}

function errorProps(key: keyof CoachingApplicationInput, errors: Errors) {
  const has = Boolean(errors[key]);
  return {
    'aria-invalid': has || undefined,
    'aria-describedby': has ? `${key}-error` : undefined,
  } as const;
}

function RequiredMark() {
  return (
    <span className="text-white/45" aria-hidden>
      *
    </span>
  );
}

function Field({
  label,
  hint,
  htmlFor,
  error,
  required,
  optional,
  className = '',
  children,
}: {
  label: string;
  hint?: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="field-label">
        {label}
        {required && (
          <>
            {' '}
            <RequiredMark />
          </>
        )}
        {optional && <span className="field-hint"> (optional)</span>}
      </label>
      {hint && <p className="field-hint mt-1 text-sm">{hint}</p>}
      <div className="mt-3">{children}</div>
      {error && (
        <p id={`${htmlFor}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

function Choice({
  type,
  name,
  id,
  checked,
  onChange,
  invalid,
  children,
}: {
  type: 'radio' | 'checkbox';
  name: string;
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  invalid?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="choice">
      <input
        type={type}
        name={name}
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-invalid={invalid || undefined}
      />
      <span className="choice-mark" data-type={type} aria-hidden />
      <span className="text-[0.95rem] leading-relaxed text-white/85">{children}</span>
    </label>
  );
}
