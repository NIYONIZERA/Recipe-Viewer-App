import { UserProfile } from '@clerk/nextjs';
import { SignedIn } from '@clerk/nextjs';

export default function UserPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 pt-20">
      <SignedIn>
        <UserProfile routing="path" path="/user" />
      </SignedIn>
    </div>
  );
}