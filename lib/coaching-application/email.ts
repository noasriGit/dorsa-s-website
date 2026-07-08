import { Resend } from 'resend';
import {
  COACHING_INTEREST_LABELS,
  READY_TO_CHANGE_LABELS,
  READY_TO_INVEST_LABELS,
  type CoachingApplicationPayload,
} from './schema';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'America/New_York',
  });
}

function buildEmailHtml(data: CoachingApplicationPayload): string {
  const isInPerson = data.coachingInterest === 'in-person';
  const isOnline = data.coachingInterest === 'online';

  const interestExtras = isInPerson
    ? `
      <p><strong>Program:</strong> ${COACHING_INTEREST_LABELS['in-person']}</p>
      <p><strong>Acknowledged $140/hr pricing:</strong> ${data.inPersonPricingAcknowledged ? 'Yes' : 'No'}</p>
      <p><strong>Location:</strong> Tyson's corner, VA / Virtual</p>
    `
    : isOnline
      ? `
      <p><strong>Program:</strong> ${COACHING_INTEREST_LABELS.online}</p>
      <p><strong>Pricing shown publicly:</strong> Yes ($399/month)</p>
      <p><strong>Needs follow-up/call:</strong> Yes</p>
    `
      : '';

  return `
<!DOCTYPE html>
<html>
<body style="font-family: system-ui, sans-serif; color: #2c2c2c; line-height: 1.6; max-width: 600px;">
  <h2 style="color: #2c2c2c; font-weight: 500;">New Coaching Application</h2>

  <div style="background: #faf8f5; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
    <p><strong>Submitted at:</strong> ${formatDate(data.submittedAt)}</p>
    <p><strong>Coaching interest:</strong> ${COACHING_INTEREST_LABELS[data.coachingInterest]}</p>
    <p><strong>Source page:</strong> ${data.sourcePage}</p>
  </div>

  <h3 style="font-weight: 500; border-bottom: 1px solid #d9d4c7; padding-bottom: 8px;">Contact Info</h3>
  <p><strong>Full Name:</strong> ${escapeHtml(data.fullName)}</p>
  <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
  <p><strong>Phone Number:</strong> ${escapeHtml(data.phone)}</p>
  <p><strong>How old are you?:</strong> ${escapeHtml(data.age)}</p>
  <p><strong>Instagram handle:</strong> ${data.instagram ? escapeHtml(data.instagram) : 'None'}</p>

  <h3 style="font-weight: 500; border-bottom: 1px solid #d9d4c7; padding-bottom: 8px; margin-top: 24px;">Program & Goals</h3>
  ${interestExtras}
  <p><strong>What is your main fitness goal?:</strong><br>${escapeHtml(data.fitnessGoal)}</p>
  <p><strong>Exercise history & injuries:</strong><br>${escapeHtml(data.exerciseHistory)}</p>
  <p><strong>Dietary restrictions:</strong><br>${escapeHtml(data.dietaryRestrictions)}</p>

  <h3 style="font-weight: 500; border-bottom: 1px solid #d9d4c7; padding-bottom: 8px; margin-top: 24px;">Commitment & Investment</h3>
  <p><strong>Are you ready to make change?:</strong> ${READY_TO_CHANGE_LABELS[data.readyToChange]}</p>
  <p><strong>Ready to invest financially?:</strong> ${READY_TO_INVEST_LABELS[data.readyToInvest]}</p>
</body>
</html>
  `.trim();
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function sendApplicationEmail(
  data: CoachingApplicationPayload
): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.COACHING_APPLICATION_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return { ok: false, error: 'Email service is not configured' };
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject: `New Coaching Application - ${data.fullName}`,
    html: buildEmailHtml(data),
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
