import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { DEMO_USER, isLoggedIn, login } from '../utils/auth';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Already signed in? Go straight to the student list.
  if (isLoggedIn()) {
    return <Navigate to="/students" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    if (login(email, password)) {
      navigate('/students', { replace: true });
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-5">
        <h3 className="page-title text-center mb-4">Student Manager</h3>

        <div className="card">
          <div className="card-body p-4">
            <h5 className="mb-3">Sign in</h5>

            {/* Demo credentials */}
            <div className="demo-box mb-3 small">
              <div className="fw-semibold mb-1">Demo login</div>
              <div>Email: {DEMO_USER.email}</div>
              <div>Password: {DEMO_USER.password}</div>
            </div>

            {error && (
              <div className="alert alert-danger py-2" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
