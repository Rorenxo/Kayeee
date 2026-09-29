# 💌 Love Letter Surprise Website — Design Rules

> **IMPORTANT:** This file is the design source of truth for this project.
>
> Before creating, modifying, or redesigning ANY component, page, animation, layout, or UI element, READ THIS FILE FIRST.
>
> All future development must follow these rules unless the project owner explicitly changes them.

---

# 1. Project Overview

This project is a private digital love-letter / surprise website made for a couple.

The website should feel like a:

- Personal memory
- Digital love letter
- Romantic photo album
- Cinematic story
- Intimate experience

It should NOT feel like a generic Valentine's website or a normal landing page.

## Core Design Feeling

The website should be:

- Romantic
- Chill
- Intimate
- Aesthetic
- Minimal
- Soft
- Cinematic
- Personal
- Elegant
- Premium but simple

### Main Design Principle

> Emotion > Decoration  
> Simplicity > Complexity  
> Storytelling > UI Elements  
> Breathing Room > Filling Empty Space  
> Subtle Animation > Flashy Animation

The final experience should make the recipient feel:

> "Someone really made this specifically for me."

---

# 2. Tech Stack

The project uses:

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- HTML5 `<audio>`
- HTML5 `<video>`

No backend or database is required for the current website.

This is intended to be a static website that can eventually be deployed to Vercel.

---

# 3. NON-NEGOTIABLE DEVELOPMENT RULES

Every time development is performed, check this document FIRST.

The following rules must always be preserved:

1. Color palette
2. Mobile-first development
3. Minimal romantic visual language
4. Cinematic storytelling
5. Simple interactions
6. Typography system
7. Subtle animations
8. Responsive behavior
9. Accessibility
10. Performance
11. Story progression

Do not introduce a completely different design direction without explicit approval.

---

# 4. Color Palette

Use this exact primary palette throughout the website.

| Purpose | Color |
|---|---|
| Primary / Background | `#F4EFE6` |
| Secondary / Container | `#C4B39A` |
| Accent / Buttons | `#6B4C3A` |

## Color Philosophy

The color palette should feel:

- Warm
- Earthy
- Calm
- Romantic
- Elegant
- Soft
- Natural

Supporting shades may be derived from these colors when necessary.

Do not introduce random colors.

## Avoid

- Bright red
- Neon colors
- Excessive pink
- Highly saturated colors
- Strong gradients
- Excessive shadows
- Random accent colors
- Generic Valentine's color palettes

The design should feel inspired by:

- Warm paper
- Old photographs
- A handwritten letter
- Soft natural tones

---

# 5. MOBILE-FIRST DEVELOPMENT

## THIS IS A MOBILE-FIRST PROJECT

Mobile is the PRIMARY design target.

Every component must be designed for mobile first.

Only after the mobile experience is correct should it be adapted for tablet and desktop.

### Mobile Requirements

- No horizontal scrolling
- No text overflow
- Comfortable touch targets
- Readable typography
- Proper spacing
- Responsive images
- Responsive video
- Full-screen sections when appropriate
- Smooth animations
- One-handed usability where practical
- Proper mobile viewport handling

Use:

```css
100dvh