# proFPL Privacy Policy

Effective date: October 6, 2026

proFPL is an independent companion app for Fantasy Premier League managers on
Android and iOS. It helps users view gameweek information, manage squads and
transfers, review fixtures, leagues, cups, and player information, schedule
local reminders, and access optional proFPL+ features. This Privacy Policy
explains what information is handled when you use proFPL, how it is used, when
it may be shared, and what choices you have.

proFPL is operated by Mishmash Labs. proFPL is not affiliated with, endorsed by,
or associated with the Premier League or Fantasy Premier League.

## 1. Summary

- proFPL does not create or operate your Fantasy Premier League account.
- You can view public FPL information using a Team ID or Explore without
  supplying a password. FPL sign-in is required for private account information
  and actions such as Pick Team and Transfers.
- When you sign in, your credentials and authentication information are sent
  over encrypted HTTPS connections to Premier League account and Fantasy
  Premier League services so the app can access your account data.
- If you save an account, sign-in details and reusable session information are
  stored using your device's platform secure-storage facilities.
- Squad, fixture, dashboard, preference, reminder, and Plus entitlement data may
  be stored locally on your device.
- The free version may use Google AdMob to show ads after the applicable consent
  flow permits ad requests.
- Optional subscriptions and lifetime purchases are processed by Google Play or
  Apple, not directly by Mishmash Labs.
- RevenueCat manages purchase entitlements using an app-user identifier and
  receives the active FPL entry ID as a customer attribute.
- Supported home screen widgets store selected public team and gameweek
  information locally and may refresh it from FPL services.
- The current app does not include Firebase Analytics or a dedicated remote
  crash-reporting SDK.
- proFPL does not request access to your camera, microphone, contacts, or precise
  device location.

## 2. Information We Handle

### A. Fantasy Premier League account information

When you sign in to proFPL, the app may handle information associated with your
existing Fantasy Premier League account, including:

- email address and password entered for Fantasy Premier League sign-in
- authentication tokens, session cookies, and related session information
- Fantasy Premier League entry or user identifiers
- manager name and team name
- squad selections, captain and bench choices, chips, transfers, transfer
  history, budget, points, and rankings
- classic league, cup, standings, and rival-entry information
- other account information returned by Fantasy Premier League services that is
  needed to provide app features

The app sends the sign-in information you provide to Premier League account
services over HTTPS for authentication. Mishmash Labs does not operate those
services and does not receive your payment-card details or your Premier League
account password on a developer-operated server through the current app
architecture.

If you choose to save an account or use automatic sign-in, proFPL stores the
account email, password, reusable authentication information, entry identifier,
manager name, and team name using platform secure storage on your device. The
selected-account and automatic-sign-in preferences are stored in app
preferences.

You can instead connect using a public Team ID without entering an email or
password. Public mode loads the team name, manager name, points, history,
leagues and other publicly accessible entry information from FPL. A saved
public entry contains its identifier and public profile information, not
sign-in credentials. Explore opens a sample public team for the current visit
and does not save it as an account. Public viewing does not authorize private
account actions.

### B. Information stored locally on your device

proFPL stores app data locally so it can work efficiently and remember your
choices. This may include:

- cached dashboard, squad, player, fixture, league, and gameweek information
- theme, color, display, and other app preferences
- saved-account selection and automatic-sign-in settings
- gameweek reminder settings, scheduled notification information, and timezone
  data
- pending squad, lineup, chip, and transfer choices while you use the app
- saved player wishlist entries and local review-prompt state
- a local cache of proFPL+ product and entitlement status
- consent and privacy-choice state made available by the advertising consent SDK

Most local app data is not sent to a Mishmash Labs-operated server by the
current app architecture. Data that is needed for account features is exchanged
with Premier League services, and advertising and purchase information is
handled as described below.

Supported home screen widgets use local shared app storage for the selected
entry ID, team name, points, rank, gameweek deadlines and update timestamps.
That information may be visible to anyone who can see your home screen. Widget
refreshes may request public FPL data in the background without sending saved
passwords or private authentication tokens. You can remove widgets through
your device's home screen controls.

### C. Public football and player information

proFPL requests public or account-accessible football information from Premier
League and Fantasy Premier League services. This may include fixtures, results,
teams, standings, player names, player images, statistics, availability,
ownership, prices, and gameweek data. Requests necessarily expose technical
information such as your IP address and device network information to the
service receiving the request.

Premier League services process information under their own terms and privacy
notices. Your use of a Fantasy Premier League account remains governed by the
terms and privacy information provided by the Premier League.

### D. Advertising

The free version of proFPL may display ads using Google AdMob and the Google
Mobile Ads SDK. Google User Messaging Platform may also present consent or
privacy-choice messages where required. When these services are used, Google
and its advertising partners may process information such as:

- device, app, and advertising identifiers
- IP address
- approximate location derived from IP address
- device, operating-system, language, and app information
- ad requests, impressions, interactions, and performance data
- diagnostics, fraud-prevention, and security information
- consent and privacy-choice status

This information may be used to deliver, limit, personalize where permitted,
and measure ads, and to support fraud prevention, security, and legal
compliance. Google and its partners process this information under their own
terms and privacy policies.

proFPL+ is designed to suppress ads while a valid Plus entitlement is
active. Advertising consent controls may remain available where required.

On iOS, proFPL requests App Tracking Transparency authorization. If you allow
tracking, applicable advertising services may use the device advertising
identifier for measurement or personalization. If you deny or later revoke
authorization, IDFA-based measurement and personalization are limited.

Declining ATT does not remove ads or stop all advertising-related processing.
Eligible ads and privacy-preserving attribution may continue without IDFA
under the applicable Google consent signals. Google's consent SDK determines
whether a regional privacy message is required; ad requests may be permitted
without a prompt where no configured message is required.

### E. Purchase and subscription information

proFPL offers optional monthly and yearly subscriptions and a lifetime
non-consumable purchase. Payments are processed by Google Play on Android and
Apple on iOS. Mishmash Labs does not directly collect or process your full
payment-card details.

The app and the relevant storefront may handle information such as:

- product identifier and localized product details
- purchase or transaction status
- purchase token, transaction identifier, receipt, or signed transaction data
- subscription status, renewal, expiration, cancellation, grace-period, account
  hold, refund, and revocation information
- storefront account and region information made available by the platform

This information is used to start purchases, verify and restore access, maintain
Plus entitlements, prevent fraud, and provide subscription-management links.
Purchase status may be cached locally. The app sends purchase information to
RevenueCat, which validates eligible store transactions and returns the
authoritative entitlement status. RevenueCat uses the store credentials
configured by Mishmash Labs in its service, but those credentials and
payment-card details are not stored in the app.

RevenueCat is configured on supported mobile platforms at app startup, not
only after a purchase. It may receive an app-user identifier, store transaction
and entitlement information, device and app information, and technical network
information such as an IP address. The app also sends the active FPL entry ID
as the `fpl_entry_id` customer attribute, including when a public Team ID is
selected. This links that public entry to the RevenueCat customer record used
for purchase management; switching FPL accounts does not create a separate
purchase entitlement. The app does not send your FPL password or reusable FPL
session tokens to RevenueCat.

Mishmash Labs can access customer and purchase-management information made
available through its RevenueCat account for entitlement support. RevenueCat
and the stores retain their records according to their own policies and legal
obligations; clearing local app data does not delete those records.

Google and Apple retain transaction records according to their own legal and
business requirements.

### F. Notifications and reminders

If you enable gameweek reminders, proFPL requests notification permission and
schedules local notifications on your device. On Android, it may also request
permission to schedule exact alarms so a reminder can appear at the selected
time. Reminder settings and scheduled times are stored locally.

proFPL does not currently use remote push notifications for these reminders.
You can disable reminders in the app or change notification and alarm
permissions in your device settings.

### G. App updates and external actions

On Android, proFPL may use Google Play's in-app update service to check for and
install available updates. On iOS, the app may query Apple's public storefront
service to compare the installed version with the current App Store version.
Google or Apple may receive technical request information such as your IP
address and app identifier when these checks occur.

If you choose to share a squad image, proFPL passes the generated image to the
operating-system share interface. The destination app or person you choose may
then receive that image under their own privacy practices. proFPL does not
select the recipient for you.

Optional in-app review requests are handled by the relevant app store. A shared
squad image may reveal your team name, lineup or other information shown in
the image, so review it before choosing a recipient.

### H. Support communications

If you contact Mishmash Labs for support or a privacy request, we may receive
the information you choose to provide, such as your email address, message,
screenshots, device information, and troubleshooting details. This information
is used to respond to your request, investigate issues, and maintain appropriate
support records.

Do not send your Fantasy Premier League password, authentication token, or
payment-card information in a support message.

## 3. How We Use Information

proFPL uses information to:

- authenticate with your existing Fantasy Premier League account at your
  request
- display public team data when you use a Team ID or Explore
- load and display your squad, points, transfers, fixtures, leagues, cups,
  rankings, and related football information
- submit squad, lineup, chip, captain, and transfer actions you choose to make
- save accounts and restore sessions when you enable those features
- cache information for faster loading and limited offline display
- remember themes, preferences, and settings
- schedule and manage local gameweek reminders
- update supported home screen widgets with public team and deadline information
- show ads in the free version and honor available privacy choices
- start, validate, restore, and maintain proFPL+ purchases
- check for app updates
- prevent abuse, protect purchases, diagnose failures, and keep the app secure
- respond to support and privacy requests
- comply with applicable legal obligations

Where data-protection law requires a legal basis, processing may be based on
providing features you request, your consent, legitimate interests in operating
and securing the app, or compliance with legal obligations. You may withdraw
consent for optional processing through the controls described in this policy,
without affecting processing that occurred before withdrawal.

## 4. When Information Is Shared

Mishmash Labs does not sell your personal information.

Information may be transmitted to or processed by third parties where needed to
provide features you use:

- Premier League account and Fantasy Premier League services, for sign-in,
  account data, football data, and account actions
- Google AdMob, Google Mobile Ads, User Messaging Platform, and advertising
  partners, for consent flows, ad delivery, measurement, fraud prevention, and
  compliance
- Google Play, for Android app distribution, updates, billing, purchase
  verification, and restoration
- Apple App Store and StoreKit, for iOS app distribution, version checks,
  billing, purchase verification, and restoration
- RevenueCat, for purchase validation, entitlement status, restoration, and
  subscription-management information
- an app you select through the operating-system share interface, when you
  choose to share content
- professional advisers, authorities, or other parties where reasonably
  necessary to comply with law, protect rights and safety, investigate fraud,
  or complete a business reorganization

These providers may process information under their own privacy notices, terms,
and legal obligations. Mishmash Labs does not control independent third-party
services.

## 5. Data Retention

- Saved FPL account details and reusable session information remain in platform
  secure storage until you remove the saved account, clear relevant app data,
  or platform behavior removes that information.
- Cached football and account data, preferences, reminder settings, and local
  Plus status remain on your device until removed by an in-app action where
  available, clearing app storage, or uninstalling the app, subject to device
  backup, restore, and secure-storage behavior.
- Scheduled local notifications remain until they fire, are replaced or
  cancelled, reminders are disabled, app data is removed, or the operating
  system removes them.
- Support communications are retained only as long as reasonably needed to
  respond, maintain records, resolve disputes, enforce agreements, and meet
  legal obligations.
- RevenueCat customer attributes and purchase records are retained under its
  policies and the applicable purchase-support and legal requirements. Removing
  a saved FPL account does not delete the RevenueCat customer record.
- Advertising, Premier League, RevenueCat, Google Play, and Apple retention periods are
  determined by those providers.

Removing proFPL data does not delete your Fantasy Premier League account or
store purchase history. Those are controlled by the Premier League, Google, or
Apple respectively.

## 6. Your Choices and Rights

You can choose to:

- decline to save an FPL account and disable automatic sign-in
- use a public Team ID or Explore instead of supplying FPL credentials
- remove saved accounts from the Accounts section in Settings
- log out of the current FPL session
- clear app data through your device settings or uninstall the app, subject to
  platform backup and secure-storage behavior
- enable, disable, or change gameweek reminders
- deny or revoke notification and exact-alarm permissions in device settings
- allow, deny, or later revoke App Tracking Transparency authorization in iOS
  settings
- review or change available ad privacy choices from Settings when the privacy
  options entry point is presented
- use the free version without buying Plus
- purchase Plus, restore an eligible purchase, or manage a subscription through
  the relevant storefront
- choose whether and where to share a generated squad image
- remove home screen widgets if you do not want public team information displayed

Depending on where you live, you may also have legal rights to request access,
correction, deletion, restriction, objection, portability, or withdrawal of
consent for personal information controlled by Mishmash Labs, and to complain
to a data-protection authority. Use the contact method in Section 12 to make a
request. We may need information to verify your identity and determine which
service controls the requested data.

For information held by your Fantasy Premier League account, AdMob, Google
account, Apple account, Google Play, or the App Store, submit your request
directly to the relevant provider. Mishmash Labs cannot delete an account,
advertising record, or transaction record controlled by those providers.

For a request about the RevenueCat customer record associated with proFPL,
contact Mishmash Labs. We may need your RevenueCat app-user identifier or
non-sensitive transaction details to locate the correct record. A deletion
request does not cancel an active store subscription; manage cancellation
through the relevant store. Never send an FPL password or session token.

## 7. Children

proFPL is a general-audience sports utility and is not directed to children. It
does not provide a Mishmash Labs-operated child profile or knowingly seek to
collect personal information directly from children. Users must satisfy the age
and eligibility requirements imposed by the Fantasy Premier League account and
the applicable app store.

If you are a parent or guardian and believe a child has provided personal
information to Mishmash Labs in a way that raises a privacy concern, use the
contact method in Section 12.

## 8. Security

proFPL uses HTTPS for network requests to supported services and uses
platform-provided secure storage for saved account credentials and reusable
session information. Access to locally stored information may also depend on
your device security, operating system, backups, and account configuration.

Reasonable technical and organizational measures are used where Mishmash Labs
operates a service, but no method of electronic storage or transmission is
guaranteed to be completely secure. Keep your device and operating system up to
date, protect your device account and passcode, and do not share your FPL
credentials.

## 9. International Processing

Third-party providers used by proFPL, including Premier League, Google, Apple,
RevenueCat,
advertising partners, storefront services, and infrastructure providers, may
process information on servers located in countries other than your own. Those
countries may have different data-protection laws. Providers are responsible
for the safeguards described in their own privacy notices and agreements.

## 10. Changes To This Policy

This Privacy Policy may be updated from time to time to reflect changes to
proFPL, third-party services, legal requirements, or privacy practices. The
updated policy will show a revised effective date and will be made available
through the app's store listing, support page, website, or in-app link as
appropriate.

If a change materially affects how information is handled, additional notice or
consent will be provided where required by law.

## 11. Third-Party Services

proFPL currently relies on third-party services that may have their own privacy
terms, including:

- Premier League and Fantasy Premier League account, data, image, and football
  services
- Google AdMob, Google Mobile Ads, and User Messaging Platform
- Google Play services, Google Play Billing, and Google Play in-app updates
- Apple App Store, StoreKit, and Apple's public storefront lookup service
- RevenueCat, for purchase validation and entitlement management
- the destination apps you select through your device's share interface

You should review those providers' privacy notices for more detail about how
they process information on their systems:

- Premier League Privacy Policy:
  <https://www.premierleague.com/privacy-policy>
- Google Privacy Policy: <https://policies.google.com/privacy>
- How Google uses information from sites or apps that use its services:
  <https://policies.google.com/technologies/partner-sites>
- Google Play Terms of Service:
  <https://play.google.com/about/play-terms/>
- Apple Privacy Policy: <https://www.apple.com/legal/privacy/>
- Apple Media Services Terms and Conditions:
  <https://www.apple.com/legal/internet-services/itunes/>
- RevenueCat Privacy Policy: <https://www.revenuecat.com/privacy/>

## 12. Contact

For privacy questions or requests about proFPL, contact Mishmash Labs at
mishmash.labs@gmail.com. Support messages and attachments are handled as
described in Section 2.H.

When contacting support about privacy, identify proFPL and describe your request
without including your FPL password, authentication token, or payment-card
information.
