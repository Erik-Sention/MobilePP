'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const DEMO_ACCOUNTS = [
  { role: 'Patient', email: 'erik.svensson@example.com', password: 'demo123', description: 'Se mobilappen som patient' },
  { role: 'Läkare', email: 'sara.blank@sention.se', password: 'doctor123', description: 'Desktop admin med full åtkomst' },
  { role: 'Sjuksköterska', email: 'emma.lundgren@sention.se', password: 'nurse123', description: 'Desktop admin, begränsad åtkomst' },
  { role: 'Admin', email: 'admin@sention.se', password: 'admin123', description: 'Desktop admin med alla behörigheter' },
];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(email, password);

    if (success) {
      router.push('/');
    } else {
      setError('Felaktiga inloggningsuppgifter');
    }

    setIsLoading(false);
  };

  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    setError('');
    setIsLoading(true);

    const success = await login(demoEmail, demoPassword);

    if (success) {
      router.push('/');
    } else {
      setError('Felaktiga inloggningsuppgifter');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Välkommen till SENTION</CardTitle>
          <CardDescription>Logga in för att fortsätta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="E-post"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Lösenord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Loggar in...' : 'Logga in'}
            </Button>

            <div className="mt-6 space-y-3">
              <p className="text-sm text-center text-muted-foreground font-medium">
                Demo-konton (klicka för att logga in):
              </p>
              <div className="grid grid-cols-2 gap-2">
                {DEMO_ACCOUNTS.map((account) => (
                  <button
                    key={account.email}
                    type="button"
                    onClick={() => handleDemoLogin(account.email, account.password)}
                    disabled={isLoading}
                    className="p-3 text-left bg-muted hover:bg-muted/80 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <p className="text-xs font-semibold text-foreground">{account.role}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2">
                      {account.description}
                    </p>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-center text-muted-foreground mt-2">
                Eller använd formuläret ovan med demo-email och lösenord
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
