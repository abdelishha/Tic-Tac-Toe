# PWA Installation Guide

## How to Install the Tic-Tac-Toe PWA

### For Windows Users:

1. **Open the app in Microsoft Edge or Chrome**
   - Navigate to your app URL
   - Make sure you're using a modern browser (Edge, Chrome, Firefox)

2. **Install the PWA**
   - Look for the install icon in the address bar (usually a "+" or download icon)
   - Click on it and select "Install"
   - Or go to the browser menu (three dots) → "Apps" → "Install this site as an app"

3. **Launch the installed app**
   - The app will appear in your Start menu
   - You can also find it in the Apps section of your browser

### For Mobile Users:

1. **iOS (Safari)**
   - Open the app in Safari
   - Tap the share button (square with arrow)
   - Select "Add to Home Screen"
   - The app will appear on your home screen

2. **Android (Chrome)**
   - Open the app in Chrome
   - Tap the menu (three dots)
   - Select "Add to Home screen"
   - The app will appear on your home screen

## Troubleshooting "Host Cannot Be Reached" Error

### Why this happens:
- The PWA tries to connect to the original server when offline
- The service worker isn't properly caching the app resources
- The app wasn't properly installed as a PWA

### Solutions:

1. **Reinstall the PWA**
   - Uninstall the current version
   - Clear browser cache and cookies
   - Reinstall the PWA following the steps above

2. **Check if it's properly installed**
   - The app should open in its own window (not in a browser tab)
   - It should have its own icon in the taskbar/start menu

3. **Test offline functionality**
   - Install the PWA while online
   - Disconnect from the internet
   - Try to open the app - it should work offline

4. **Clear service worker cache**
   - Open browser developer tools (F12)
   - Go to Application tab → Service Workers
   - Click "Unregister" and reload the page
   - Reinstall the PWA

## Features of this PWA:

- ✅ **Offline Support**: Works without internet connection
- ✅ **App-like Experience**: Opens in its own window
- ✅ **Automatic Updates**: Updates when new versions are available
- ✅ **Cross-platform**: Works on Windows, macOS, iOS, and Android

## Development Notes:

- The service worker caches essential resources for offline use
- The manifest.json provides app metadata and icons
- The app uses a "Cache First" strategy for better offline performance
- Updates are automatically detected and applied

## Testing Offline Mode:

1. Install the PWA while online
2. Disconnect from the internet
3. Open the app - it should work normally
4. Reconnect to the internet - the app should continue working

If you're still experiencing issues, please check:
- Browser compatibility (use Edge, Chrome, or Firefox)
- HTTPS requirement (PWAs require secure connections)
- Service worker registration (check browser console for errors) 