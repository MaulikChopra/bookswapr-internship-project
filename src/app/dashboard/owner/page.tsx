
import React from 'react';
import ProfileDropdown from '@/components/ProfileDropdown';

const OwnerDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end">
        <ProfileDropdown />
      </div>
      <h1 className="text-2xl font-bold mb-4">Owner Dashboard</h1>
      <p>Welcome, Book Owner! Manage your book listings here.</p>
      {/* Add New Book Form */}
      {/* My Listings Table */}
    </div>
  );
};

export default OwnerDashboard;
