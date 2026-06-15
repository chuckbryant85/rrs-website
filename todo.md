# RRS Website Repositioning — Tech Development & Integrations for SMBs

## Home.tsx Changes
- [ ] Hero: Change from "Never Miss Another Opportunity" / lead capture messaging → tech development & integrations positioning
- [ ] Problem: Replace missed calls/leads stats → SMB operational inefficiency / disconnected tools / manual processes
- [ ] Solution: Replace "every inbound lead" → "custom-built technology solutions" (websites, automation, payments, CRM, workflows)
- [ ] How It Works: Replace lead-to-revenue funnel → tech development engagement process (Discovery → Architecture → Build → Deploy → Optimize → Scale)
- [ ] Core Capabilities: Replace AI Chat, Missed Call Recovery, Retargeting → Website Development, Automation, Payments, CRM, Custom Workflows, Integrations
- [ ] AI Layer: Rework from "employee that never sleeps" → technology & automation layer that powers client systems
- [ ] Revenue Impact: Rework from industry-specific lead capture → SMB operational impact / efficiency gains / cost savings
- [ ] Why RRS: Rework from "leads slip through cracks" → "disconnected tools, manual processes, no scalable systems"
- [ ] CTA: Update messaging to match new positioning
- [ ] Remove Larry Drew II and Stephanie Arakel from Team section
- [ ] Update team grid from 5 columns to 3 columns

## Calculator Page
- [ ] Rework from lead capture calculator → ROI calculator for tech modernization / operational efficiency

## Pricing Page
- [ ] Rework from AI lead management tiers → tech development & integration service tiers

## Nav
- [ ] Update nav links if needed (Solution, Results, Team, Pricing + CTA)
- [ ] Consider changing "Calculate ROI" CTA text

## Discovery Questionnaire Page

- [x] Create Discovery.tsx page at /discovery route with all 5 questions displayed on one page
- [x] Each question has multi-select checkboxes with predefined options + "Other" free-text field
- [x] Horizontal progress bar that lights up green as questions are answered
- [x] Add backend tRPC route to send completed form responses via email to chuck@ffwlv.com
- [x] Add /discovery route to App.tsx
- [x] Page is publicly accessible (no auth required) as a shareable link
