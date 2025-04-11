
import React from 'react';
import ProfileDropdown from '@/components/ProfileDropdown';

const SeekerDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end">
        <ProfileDropdown />
      </div>
      <h1 className="text-2xl font-bold mb-4">Seeker Dashboard</h1>
      <p>Welcome, Book Seeker! Browse available book listings.</p>
      {/* All Book Listings (card view) */}
      {/* Filter/Search by title, genre, location */}
    </div>
  );
};

export default SeekerDashboard;
