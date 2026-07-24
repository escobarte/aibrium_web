import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Aibrium Studio',
  description:
    'How Aibrium Studio handles the limited information we collect: cookieless analytics and the emails you choose to send us.',
}

export default function PrivacyPage() {
  return (
    <main className="bg-cream [padding-block:clamp(112px,14vw,168px)]">
      <article className="mx-auto max-w-[760px] px-6">
        <p className="font-label text-[13px] font-medium uppercase tracking-[0.22em] text-gold-deep">
          Legal
        </p>
        <h1 className="mt-4 font-display font-semibold text-ink [font-size:clamp(34px,5vw,56px)] [line-height:1.1]">
          Privacy Policy
        </h1>
        <p className="mt-4 font-body text-[14px] text-grey">
          Last updated: 2026
        </p>

        <div className="mt-10 space-y-8 font-body text-[17px] leading-relaxed text-ink/90">
          <p>
            Aibrium Studio (&laquo;Mining capital LLC&raquo; SRL, trading as
            Aibrium Studio) operates this website. We keep data collection to the
            minimum a marketing site needs, and we do not sell or rent your
            information to anyone. This policy explains what we collect, why, and
            the choices you have.
          </p>

          <section>
            <h2 className="font-display text-[26px] font-semibold text-ink">
              What we collect
            </h2>
            <p className="mt-4">
              <strong className="font-medium">Cookieless analytics.</strong> We
              use privacy-friendly, cookieless analytics to understand how the
              site is used in aggregate — for example, which pages are viewed and
              which buttons are clicked. These measurements do not use cookies,
              do not track you across other websites, and are not tied to your
              identity. Because there are no tracking cookies, this site shows no
              cookie banner.
            </p>
            <p className="mt-4">
              <strong className="font-medium">Information you send us.</strong>{' '}
              If you email us or book a call, we receive the details you choose to
              share — such as your name, email address, company, and anything you
              write in your message or provide during scheduling.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[26px] font-semibold text-ink">
              How we use it
            </h2>
            <p className="mt-4">
              We use aggregate analytics to improve the site&apos;s content and
              performance. We use the information you send us to reply to you,
              schedule and prepare for calls, send requested samples, and — if we
              begin working together — to deliver our services. We keep this
              correspondence only as long as needed for those purposes or as
              required by law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[26px] font-semibold text-ink">
              Third parties
            </h2>
            <p className="mt-4">
              We rely on a small number of trusted providers to run this site:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                <strong className="font-medium">Plausible Analytics</strong> —
                cookieless, aggregate usage measurement.
              </li>
              <li>
                <strong className="font-medium">Calendly</strong> — call
                scheduling. If you book a call, the information you enter is
                processed by Calendly under its own privacy policy.
              </li>
            </ul>
            <p className="mt-4">
              These providers process data only to deliver their service to us
              and under their respective privacy terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[26px] font-semibold text-ink">
              Your rights
            </h2>
            <p className="mt-4">
              You may ask us what information we hold about you, request a copy,
              ask us to correct it, or ask us to delete it. Because our analytics
              are cookieless and aggregate, they contain no personal profile to
              access or erase — but any correspondence you&apos;ve sent us is
              yours to request or have removed. To exercise any of these rights,
              contact us at the address below.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[26px] font-semibold text-ink">
              Contact
            </h2>
            <p className="mt-4">
              Questions about this policy or your data? Email us at{' '}
              <a
                href="mailto:hello@aibrium.com"
                className="font-medium underline decoration-gold-deep underline-offset-4 transition-colors hover:text-gold-deep"
              >
                hello@aibrium.com
              </a>
              . We reply within 24 hours, Monday to Friday.
            </p>
            <p className="mt-4 text-[15px] text-grey">
              &laquo;Mining capital LLC&raquo; SRL, t/a Aibrium Studio ·
              Chi&#537;in&#259;u, Republic of Moldova.
            </p>
          </section>
        </div>
      </article>
    </main>
  )
}
