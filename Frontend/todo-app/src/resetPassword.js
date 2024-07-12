import React from 'react';
import Layout from './layout';
const ResetPassword = ({ msg, msgType }) => {
  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          Reset Password
        </div>
        <div className="card-body">
          {msg && (
            <div className={`alert ${msgType === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
              {msg}
            </div>
          )}
          <form method="POST" action="/auth/resetPassword">
            {/* <input> type="hidden" name="oobCode" value="{oobCode}"</input> */}
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input type="password" className="form-control" id="newPassword" name="new_password" required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
