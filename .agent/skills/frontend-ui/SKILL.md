---
name: frontend-ui
description: Implement user-facing features, components, and visual design changes. Use when building UI components, implementing designs from mockups, or maintaining design system consistency.
allowed-tools: read_file write_file run_command list_files
---

# Skill: Frontend UI development

## Purpose

Implement user-facing features, components, and visual design changes that follow established patterns and maintain consistency across the product. This skill focuses on building polished, accessible interfaces that work across devices and browsers.

## When to use this skill

- Building **new UI components** for the design system or product features.
- Implementing designs from **Figma, Sketch, or image references**.
- Fixing **visual bugs, responsive issues, or accessibility problems**.
- Refactoring components to improve **maintainability or performance**.
- Adding **animations, transitions, or interactive behaviors**.

## Inputs

- **Design reference**: Figma link, screenshot, or detailed description.
- **Component requirements**: props, states, variants, and behaviors.
- **Context**: where the component will be used and how it fits the existing system.
- **Accessibility requirements**: WCAG level, keyboard navigation needs, screen reader considerations.

## Out of scope

- Backend API design or database schema changes.
- Major architectural decisions (state management overhauls, framework migrations).
- Design decisions that require product or design team input.
- Performance optimizations that require infrastructure changes.

## Conventions

- Use the **existing component library** (shadcn, Radix, MUI, etc.) before creating new primitives.
- Follow the project's **naming conventions** for files, components, and CSS classes.
- Use **design tokens** (colors, spacing, typography) from the design system.
- Write components with **TypeScript** and proper prop types.
- Prefer **composition over configuration** for flexible components.

## Required behavior

1. Review existing components for patterns and conventions before starting.
2. Implement with **accessibility first**: semantic HTML, ARIA labels, keyboard navigation.
3. Handle all states: loading, empty, error, and edge cases.
4. Test across **breakpoints**: mobile, tablet, desktop.
5. Ensure **theme compatibility** if the product supports light/dark modes.

## Required artifacts

- Component files in the appropriate directory structure.
- **TypeScript types** for all props and exported interfaces.
- **Unit tests** for component logic and user interactions.
- **Storybook stories** if the project uses Storybook (showing all variants and states).

## Implementation checklist

1. Identify existing components and patterns to reuse or extend.
2. Create the component structure with proper TypeScript types.
3. Implement the visual design using design system tokens.
4. Add all necessary states (hover, focus, active, disabled).
5. Implement responsive behavior for all breakpoints.
6. Add accessibility features (ARIA, keyboard nav, focus management).
7. Write tests covering critical interactions.
8. Add Storybook stories for documentation.

## Verification

Run the standard validation commands (tests, lint, type checks). In addition:

- Visually compare against the design reference at all breakpoints.
- Test keyboard navigation and screen reader announcements.
- Verify in both light and dark themes if applicable.
- Check for console errors and warnings.

The skill is complete when:

- All validation commands pass.
- Component matches the design specification.
- Accessibility audit passes (axe, Lighthouse).
- Component works correctly across supported browsers.

## Safety and escalation

- If a design requirement conflicts with accessibility guidelines, flag this and propose alternatives.
- If implementing a pattern that differs significantly from existing conventions, document the reasoning and get team buy-in.
- If performance concerns arise (large bundle impact, render performance), profile and escalate if needed.