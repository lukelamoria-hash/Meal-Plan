# Mediterranean 90-Day Cut App

Version 2 adds:

- A dedicated Progress tab
- A responsive weight progress graph
- Actual weight versus planned target trend
- Add, replace, and delete daily weigh-ins
- Latest weight, total lost, remaining, and seven-day average
- A live date-and-time card on the dashboard
- A mini progress chart on the dashboard
- Migration of weigh-ins saved by the first app version
- Offline/installable PWA support

## Deploy through GitHub and Vercel

1. Download and unzip the package.
2. In the GitHub repository, choose **Add file → Upload files**.
3. Upload all files from the unzipped folder to the repository root.
4. Choose **Commit changes**.
5. Vercel should deploy the update automatically.

This is a static application. No build command or environment variables are required.

## Storage note

Weigh-ins and habit checkboxes are stored in the browser using `localStorage`.
They remain available offline on that device. They do not yet sync between different phones or browsers.
