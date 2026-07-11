import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!deferredPrompt || dismissed) return null;

  return (
    <div className="install-prompt">
      <span>Install Flip Flop for offline play</span>
      <div className="install-prompt__actions">
        <button
          type="button"
          className="button button--primary button--small"
          onClick={async () => {
            await deferredPrompt.prompt();
            await deferredPrompt.userChoice;
            setDeferredPrompt(null);
          }}
        >
          Install
        </button>
        <button type="button" className="button button--small" onClick={() => setDismissed(true)}>
          Not now
        </button>
      </div>
    </div>
  );
}
