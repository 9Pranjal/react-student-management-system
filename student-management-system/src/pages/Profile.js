import React from 'react';
import { getCurrentUser } from '../utils/auth';

// Shows the details of the signed-in user (saved in localStorage at login).
function Profile() {
  const user = getCurrentUser();

  return (
    <div>
      <h3 className="page-title mb-4">User Profile</h3>
      <div className="card">
        <div className="card-body p-4">
          <div className="d-flex align-items-center gap-3">
            <div className="avatar avatar-placeholder">
              {user && user.name ? user.name.charAt(0).toUpperCase() : '?'}
            </div>
            <div>
              <h5 className="mb-1">{user ? user.name : 'Unknown user'}</h5>
              <div className="text-muted">{user ? user.email : ''}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
