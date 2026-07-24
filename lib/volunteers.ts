export type VolunteerRole = {
  id: string;
  title: string;
  location: string;
  summary: string;
  timeCommitment: string;
  skills: string;
};

export const volunteerRoles: VolunteerRole[] = [
  {
    id: "phone-banking",
    title: "Phone Banking",
    location: "Manchester",
    summary: "Contact voters directly and invite them to write in Nick Varga.",
    timeCommitment: "2–3 hour shifts, evenings and weekends",
    skills: "Comfortable on the phone; training provided",
  },
  {
    id: "canvassing",
    title: "Canvassing",
    location: "Nashua",
    summary: "Door-to-door outreach across neighborhoods.",
    timeCommitment: "Saturday mornings and weekday evenings",
    skills: "Comfortable walking routes; pair up if you’re new",
  },
  {
    id: "event-setup",
    title: "Event Setup",
    location: "Portsmouth Rally",
    summary: "Help stage campaign events — chairs, signs, check-in.",
    timeCommitment: "3–4 hours per event",
    skills: "Reliable, on-time, able to lift light materials",
  },
  {
    id: "social-media",
    title: "Social Media Team",
    location: "Remote / statewide",
    summary: "Post, engage, and amplify campaign updates online.",
    timeCommitment: "Flexible weekly hours",
    skills: "Familiar with Facebook, Instagram, or X",
  },
  {
    id: "data-entry",
    title: "Data Entry",
    location: "Campaign ops (remote or HQ)",
    summary: "Support the campaign operationally with clean, careful data work.",
    timeCommitment: "2–5 hours per week",
    skills: "Detail-oriented; spreadsheet comfort helps",
  },
  {
    id: "graphic-design",
    title: "Graphic Design Support",
    location: "Remote",
    summary: "Help produce flyers, social graphics, and event materials.",
    timeCommitment: "Project-based",
    skills: "Canva, Figma, or similar design tools",
  },
];
