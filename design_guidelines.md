# SafeHer Women's Safety App - Design Guidelines

## Design Approach
**Material Design System** - Following Google's Material Design principles optimized for mobile-first, safety-critical functionality with a feminine, approachable aesthetic.

## Core Design Principles
1. **Immediate Access**: Emergency features prominently displayed, no unnecessary taps
2. **Trust & Calm**: Soft, reassuring design that reduces panic while maintaining urgency for critical features
3. **Touch-Optimized**: Large tap targets (minimum 48px) for quick, stress-free interaction
4. **Clear Hierarchy**: Emergency features visually distinct from informational content

## Typography
- **Primary Font**: Roboto (Material Design standard)
- **Headings**: Roboto Medium (20-24px for card titles, 28-32px for page headers)
- **Body Text**: Roboto Regular (16px for card descriptions, 14px for secondary text)
- **Emergency Text**: Roboto Bold (18-20px for critical actions)

## Layout System
**Mobile-First Grid** (matches Material Design spacing)
- Base spacing unit: 8dp (use multiples: 8, 16, 24, 32)
- Card padding: p-4 (16px)
- Section spacing: py-6 to py-8 (24-32px)
- Container max-width: max-w-md (centered for mobile, expands to max-w-4xl on tablet+)

## Color Scheme (User-Specified)
- **Primary Pink**: Light pink (#FFE5EC or similar soft pink)
- **Background**: White (#FFFFFF)
- **Card Backgrounds**: White with light pink subtle gradients or borders
- **Text Primary**: Dark gray (#333333)
- **Text Secondary**: Medium gray (#666666)
- **Emergency Red**: Vibrant red (#E53E3E) for SOS button
- **Success Green**: Soft green (#48BB78) for safe status indicators

## Component Library

### Splash Screen
- Full viewport Lottie animation (women's safety themed illustration)
- SafeHer logo centered
- Animation duration: 2-3 seconds
- Smooth fade transition to home screen

### Toolbar (Top)
- Fixed position, always visible
- Height: 56px (Material Design standard)
- Light pink gradient background
- "SafeHer" logo/text left-aligned
- Menu icon (hamburger) right-aligned
- Subtle drop shadow (elevation-2)

### Home Screen - 6 Feature Cards
**Grid Layout**: 2 columns on mobile, 3 columns on tablet+
- Card style: Elevated Material cards (shadow elevation-4)
- Rounded corners: 16px border radius
- Aspect ratio: Square or 4:3
- Padding: 16px internal
- Gap between cards: 16px

**Card Structure** (each):
1. Icon area (top): 64x64px icon, centered
2. Title: 18px Roboto Medium, centered below icon
3. Subtle hover effect: slight scale (1.02) and shadow increase

**Emergency SOS Card** - Make distinctive:
- Larger than others (spans 2 columns on mobile)
- Red accent border or background tint
- Pulsing subtle glow animation
- "Emergency" badge/label

**Card Order Priority**:
Row 1: Emergency SOS (full width)
Row 2: Siren Alarm, Hidden Camera Detector
Row 3: Women's News, About Us
Row 4: Share App (centered if alone, or with padding)

### Bottom Navigation Bar
- Fixed bottom position
- Height: 56px
- 3-5 navigation items max
- Icons with labels (active state in pink, inactive in gray)
- Items: Home, Emergency, News, Profile/Settings

### Individual Feature Screens

**Emergency SOS Screen**:
- Large circular SOS button (200px diameter, centered)
- Red background, white text "PRESS FOR HELP"
- Emergency contacts quick-dial section below
- Location status indicator

**Hidden Camera Detector Screen**:
- Scan interface with camera viewfinder simulation
- Detection status indicator
- Instructions for use
- Results list

**Women's News Screen**:
- Vertical scrolling feed
- News cards with image thumbnail (left), title, and date
- Category tags (Safety Tips, Alerts, Resources)

**Siren Alarm Screen**:
- Large toggle switch/button to activate
- Volume indicator
- Warning message
- Stop button (prominent when active)

**About Us Screen**:
- Team member cards with photos
- Mission statement
- Contact information
- Privacy policy link

**Share App Screen**:
- Social sharing buttons (WhatsApp, SMS, Email, Copy Link)
- Referral message template
- Download statistics or testimonials

## Animations (Subtle as requested)
- Card entrance: Fade-up on load (stagger by 50ms each)
- Button press: Gentle scale (0.95) on tap
- Page transitions: Smooth slide (250ms)
- Emergency SOS: Very subtle pulsing glow (slow, 2s cycle)
- NO complex scroll animations or parallax

## Accessibility
- All interactive elements minimum 48x48px touch targets
- High contrast text (WCAG AA minimum)
- Clear focus states for keyboard navigation
- Screen reader labels for all icons
- Emergency features operable with one hand
- Haptic feedback for critical actions (SOS, Siren)

## Images
**Splash Screen**: Women's safety illustration (empowering, modern, diverse women)
**About Us**: Team member photos (2 members as per pre-synopsis)
**News Section**: Article thumbnails (safety-related imagery)
**Feature Icons**: Use Material Icons library - shield, camera, newspaper, volume, info, share icons

## Mobile Optimization
- Viewport meta tag for proper scaling
- Touch-friendly spacing (minimum 8px between tappable elements)
- Bottom navigation for thumb-zone ergonomics
- No horizontal scrolling
- Optimized images for mobile data
- Progressive Web App (PWA) capabilities: installable, offline-ready, push notifications for alerts