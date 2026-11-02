# Manual Testing Checklist

| Test | Steps | Expected result |
|---|---|---|
| Valid login | Enter `admin` and the development password | Redirects to dashboard |
| Invalid login | Enter an incorrect password | Generic login error appears |
| Protected route | Open `/dashboard` without a session | Redirects to `/login` |
| Add employee | Submit all valid required fields | Record is saved and listed |
| Incomplete form | Leave required fields blank | Browser/server validation prevents save |
| Duplicate email | Reuse an existing email | Friendly duplicate error appears |
| Search | Search by name, email, or ID | Matching database records appear |
| Filter | Select department/status | Results reflect filters |
| Update | Edit a record and save | Updated values appear in the directory |
| Delete | Click Delete and confirm | Record is removed |
| Invalid ID | Submit a malformed ID | Request is handled without a server crash |
| CSRF | Submit a state-changing form without token | Request is rejected with 403 |
| Logout | Click Sign out | Session is invalidated and login is shown |
| Database failure | Stop MySQL and open dashboard | Generic availability message appears |
| Responsive UI | Resize to mobile width | Sidebar and tables remain usable |
