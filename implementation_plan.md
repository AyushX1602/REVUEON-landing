# Implementation Plan - Light Mode Bento Grid Overhaul

## Goal
Transform the `ProductSuite` section to match the provided reference image, implementing a clean, high-contrast **Light Mode** aesthetic. This involves switching from the current Dark Mode to a White/Grey theme with specific card stylings.

## User Review Required
> [!IMPORTANT]
> This change reverts the "Dark Mode" Product Suite back to a **Light Theme**. This is based on the reference image provided.

## Proposed Changes

### [Landing Page Components]

#### [MODIFY] [ProductSuite.jsx](file:///d:/Revyno/google_fixed/src/components/landing/ProductSuite.jsx)
- **Section Background**: Change from `bg-[#111]` to `bg-white` (or `bg-gray-50` for subtle depth).
- **Card Styles**:
    - **Base**: `bg-white` or `bg-gray-100` (alternating based on image).
    - **Text**: `text-gray-900` (Headings), `text-gray-500` (Descriptions).
    - **Shadows**: Soft, diffused shadows (`shadow-xl`, `shadow-black/5`).
    - **Borders**: Remove harsh white borders, use subtle `border-gray-200`.
- **Specific Card Visuals** (matching image):
    - **Real-time Analytics**: White card, Yellow icon, **Yellow Wave Chart** at bottom.
    - **Global Scale**: Grey card, Blue/Grey icon, **Globe Watermark**.
    - **Lightning Fast**: Grey card, Yellow icon, **Lightning Watermark**.
    - **Enterprise Security**: White card, Shield icon.
- **Interactive Demo**: Update the "Sentiment Analysis" demo to look good on a light background (or keep it dark as a "terminal" contrast element, but ensure it fits). *Decision: Keep it dark as a "Pro" feature contrast, or invert to light? Image doesn't show the demo, only cards. I will keep the demo but maybe give it a light-theme container.*

## Verification Plan

### Automated Tests
- None (Visual change).

### Manual Verification
1.  **Visual Check**: Verify the section looks like the uploaded image (Light cards, dark text).
2.  **Visibility**: Confirm all text is readable and cards are distinct from the background.
3.  **Responsiveness**: Ensure the grid layout remains intact.
4.  **"Hidden Bento" Check**: Confirm the first card is visible (it will be white on white/grey, so shadows/borders are key).