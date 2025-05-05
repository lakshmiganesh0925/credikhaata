'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../context/AuthContext';
import { Button } from '../ui/button';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)!;
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="p-4 bg-primary text-primary-foreground flex justify-between items-center">
      <h1 className="text-xl font-bold">CrediKhaata</h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {user && (
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;