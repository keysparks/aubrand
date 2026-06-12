import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

const PRIVACY_CONTENT = `
1. Information We Collect

A. Information You Provide
• Name, Email address, Phone number, Date of birth, Photos, Bio information
• Location (if enabled)
• Messages sent through the app

B. Automatically Collected Information
• IP address, Device type, Operating system, Usage data, App interactions

C. Payment Information
Processed by third-party providers (e.g., Apple, Google). We do not store full card numbers.

2. How We Use Information

We use your information to:
• Provide matchmaking services
• Improve user experience
• Communicate with you
• Prevent fraud and abuse
• Enforce our Terms
• Send promotional content (you may opt out)

3. Location Data
• If enabled, we collect location data to match users nearby.
• You can disable location services in device settings.

4. Data Sharing

We do NOT sell personal information. We may share data with:
• Service providers (hosting, analytics)
• Payment processors
• Legal authorities if required
• In case of merger or acquisition

5. Data Security

We implement reasonable safeguards, but no system is 100% secure. Use the Service at your own risk.

6. Data Retention
• We retain your data while your account is active.
• Deleted accounts may remain in backups for up to 90 days.

7. Your Rights (U.S.)

Depending on your state, you may have rights to:
• Access your data
• Correct inaccuracies
• Delete your data
• Opt out of certain processing

Requests may be submitted to: Admin@ApproachU.com

8. Children's Privacy

This Service is not intended for individuals under 18. We do not knowingly collect data from minors.
`;

const TERMS_CONTENT = `
1. Acceptance of Terms

By creating an account, accessing, or using the ApproachU mobile application ("App"), website, or services (collectively, the "Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree, you may not use the Service. You must be at least 18 years old to use this App.

2. Eligibility

You represent and warrant that:
• You are at least 18 years old
• You are legally permitted to use dating services in your jurisdiction
• You have not been convicted of a felony involving violence, sexual misconduct, or exploitation
• You are not required to register as a sex offender
• You will comply with all applicable laws

We reserve the right to suspend or terminate accounts at our discretion.

3. User Accounts

You agree to:
• Provide accurate and truthful information
• Maintain confidentiality of login credentials
• Be solely responsible for all activity under your account

4. User Conduct

You agree NOT to:
• Harass, stalk, threaten, or intimidate others
• Post false, misleading, or fraudulent content
• Impersonate another person
• Share explicit or illegal content
• Solicit money, financial information, or cryptocurrency
• Use bots, scripts, or automation tools

Violation may result in immediate account termination without refund.

5. Safety Disclaimer

ApproachU does not conduct criminal background checks or identity verification unless explicitly stated. You are solely responsible for verifying identity of other users, meeting in safe public locations, and using caution when sharing personal information.

6. Content Ownership

You retain ownership of content you upload. However, by uploading content, you grant ApproachU a non-exclusive, worldwide, royalty-free license to display, reproduce, modify, promote, and distribute it for purposes of operating and marketing the Service.

7. Subscription & Payments
• Subscriptions auto-renew unless canceled
• Prices may change with notice
• No refunds except where required by law
• Apple/Google billing terms may apply

8. Termination

We may suspend or terminate your account for violations of these Terms, illegal activity, harmful conduct, or fraud. You may delete your account at any time.

9. Limitation of Liability

To the maximum extent permitted by law, ApproachU shall not be liable for indirect or consequential damages, emotional distress, personal injury from user interactions, loss of data, or fraud by other users. Your use of the Service is at your own risk.

10. Indemnification

You agree to indemnify and hold harmless ApproachU from any claims, damages, liabilities, costs, or legal fees arising from your conduct, your content, or your violation of these Terms.

11. Arbitration & Dispute Resolution
• All disputes shall be resolved by binding arbitration in the State of New Jersey
• You waive the right to participate in class actions

12. Governing Law

These Terms are governed by the laws of the State of New Jersey.

13. Changes to Terms

We may update these Terms at any time. Continued use constitutes acceptance.

Community Guidelines

ApproachU is built on respect, authenticity, and safety.

Respect Others
• No harassment, stalking, or intimidation
• No hate speech or discriminatory behavior
• No threats of violence

Be Authentic
• Use real photos of yourself
• No impersonation or fake accounts

No Financial Exploitation
• No requesting money or cryptocurrency
• No escort services or "sugar" arrangements

Zero Tolerance Violations
Immediate permanent ban for sexual exploitation, child exploitation, credible threats of violence, human trafficking, or revenge pornography.

Safety Tips

First Date Guidelines:
• Meet and stay in a public place
• Arrange your own transportation
• Tell a friend where you are
• Do not share home address immediately

Protect Your Information:
• Do not share financial information
• Do not send money to someone you have not met
`;

const DOCS: Record<'privacy' | 'terms', { title: string; content: string }> = {
  privacy: { title: 'Privacy Policy', content: PRIVACY_CONTENT },
  terms:   { title: 'Terms of Service', content: TERMS_CONTENT },
};

export function LegalModal({ type, onClose }: { type: 'privacy' | 'terms' | null; onClose: () => void }) {
  useEffect(() => {
    if (!type) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [type]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {type && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8"
          style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(10px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
            className="relative flex flex-col w-full max-w-2xl"
            style={{
              maxHeight: '80vh',
              borderRadius: 24,
              background: 'linear-gradient(180deg, rgba(18,20,30,0.97) 0%, rgba(7,8,13,0.98) 100%)',
              border: '1px solid rgba(191,44,64,0.28)',
              boxShadow: '0 40px 120px rgba(0,0,0,0.80), 0 0 60px rgba(191,44,64,0.08), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-8 right-8 h-px pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(191,44,64,0.55), rgba(127,169,211,0.35), transparent)' }} />

            {/* Header */}
            <div className="flex items-center justify-between px-8 pt-7 pb-5 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <h2 style={{ fontSize: 22, fontFamily: '"Inter Tight", sans-serif', fontWeight: 700, letterSpacing: '-0.03em', color: '#fff' }}>
                {DOCS[type].title}
              </h2>
              <button
                onClick={onClose}
                className="flex items-center justify-center flex-shrink-0"
                style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto px-8 py-6 flex-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(191,44,64,0.3) transparent' }}>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.32)', marginBottom: 20 }}>
                ApproachU, LLC · Effective: February 24, 2026
              </p>
              {DOCS[type].content.trim().split('\n').map((line, i) => {
                if (!line.trim()) return <div key={i} style={{ height: 8 }} />;
                const isHeading = /^\d+\./.test(line.trim()) || ['Community Guidelines','Safety Tips','Photo Moderation Policy','Background Check Disclosure','Age Verification Process','Content Reporting Procedure'].some(h => line.trim().startsWith(h));
                const isBullet = line.trim().startsWith('•');
                if (isHeading) return (
                  <p key={i} style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.90)', marginTop: 20, marginBottom: 6, letterSpacing: '-0.02em' }}>{line.trim()}</p>
                );
                if (isBullet) return (
                  <div key={i} className="flex gap-2" style={{ marginBottom: 4 }}>
                    <span style={{ color: '#BF2C40', flexShrink: 0, marginTop: 1 }}>•</span>
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.58)', lineHeight: 1.65 }}>{line.trim().slice(1).trim()}</span>
                  </div>
                );
                return <p key={i} style={{ fontSize: 14, color: 'rgba(255,255,255,0.58)', lineHeight: 1.65, marginBottom: 4 }}>{line.trim()}</p>;
              })}
            </div>

            {/* Footer */}
            <div className="px-8 py-5 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <button
                onClick={onClose}
                className="w-full flex items-center justify-center"
                style={{ height: 44, borderRadius: 14, background: 'linear-gradient(135deg, #BF2C40 0%, #E04458 100%)', border: 'none', fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer', boxShadow: '0 8px 24px rgba(191,44,64,0.35)' }}
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
