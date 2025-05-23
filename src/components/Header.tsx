'use client'

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

export default function Header() {
  return (
    <header className="bg-orange-600 text-white shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">Recipe Viewer</h1>

        <div className="space-x-4 flex items-center">
          <SignedOut>
            <SignInButton>
              <button className="bg-white text-orange-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition">
                Sign In
              </button>
            </SignInButton>
            <SignInButton mode="modal">
              <button className="bg-white text-orange-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition">
                Sign Up
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: 'ring-2 ring-white',
                  userButtonPopoverCard: 'bg-white text-orange-600',
                  userButton: 'focus:ring-4 focus:ring-white',
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}

