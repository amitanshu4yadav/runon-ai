import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="October 2026">
      <p>
        This is a starter policy for Runon AI. Have it reviewed by a qualified lawyer and update it to match your
        business before you launch publicly.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>Account data from Google sign-in: your name, email address and profile photo.</li>
        <li>The prompts you submit to agents and the results they return, so we can show your history.</li>
        <li>Basic technical data such as logs needed to keep the service secure and reliable.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To sign you in and run the agents you request.</li>
        <li>To save your task history so you can come back to it.</li>
        <li>To protect the service from abuse.</li>
      </ul>
      <h2>Sharing</h2>
      <p>
        Prompts are sent to our AI model provider to generate results. Account and history data is stored with our
        database provider. We do not sell your personal data.
      </p>
      <h2>Your choices</h2>
      <p>You can request deletion of your account and saved data at any time by contacting us.</p>
      <h2>Contact</h2>
      <p>Add your support email address here.</p>
    </LegalPage>
  );
}
