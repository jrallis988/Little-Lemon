export type TimelineEra =
  | 'origin'
  | 'launch'
  | 'peak'
  | 'corporate'
  | 'decline'
  | 'revival';

export type TimelineEvent = {
  id: string;
  year: string;
  title: string;
  summary: string;
  era: TimelineEra;
  /** Optional callout — bands, products, or StaticVolume beats */
  highlights?: string[];
};

/**
 * PureVolume → StaticVolume history.
 * Grounded in public milestones; StaticVolume entries are product vision.
 */
export const PLATFORM_TIMELINE: TimelineEvent[] = [
  {
    id: 'unborn-media',
    year: '2001–03',
    title: 'Unborn Media',
    summary:
      'Before PureVolume, the Amherst / UMass crew (Brett Woitunski, Mitchell Pavao, Nate Hudson) built local sites as Unborn Media — a magazine-with-sound idea waiting for a home.',
    era: 'origin',
    highlights: ['Amherst, MA', 'Unborn Media, Inc.'],
  },
  {
    id: 'mp3-gap',
    year: '2003',
    title: 'The mp3.com vacuum',
    summary:
      'With CNET set to take mp3.com offline, PureVolume was conceived as an independent place for bands to upload, get found, and give songs away — discovery without the peer-to-peer chaos.',
    era: 'origin',
    highlights: ['Independent upload + download culture'],
  },
  {
    id: 'beta-launch',
    year: '2003',
    title: 'PureVolume beta launches',
    summary:
      'Thanksgiving Eve 2003: PureVolume.com opens in beta. Editorial mosaic homepage, artist pages, downloads, and human curation — thought of as a magazine that made sound.',
    era: 'launch',
    highlights: ['Featured: The Suicide Pact', 'Portal grid + artist dossiers'],
  },
  {
    id: 'purepicks',
    year: '2003–06',
    title: 'PurePicks & the A&R pipeline',
    summary:
      'Weekly PurePicks spotlighted eight new artists. Labels watched. Gym Class Heroes went from PurePicks to Fueled by Ramen — proof that a human-curated portal could mint careers.',
    era: 'peak',
    highlights: ['PurePicks', 'Gym Class Heroes → Fueled by Ramen'],
  },
  {
    id: 'scene-years',
    year: '2005–09',
    title: 'The scene years',
    summary:
      'Mid-2000s emo, pop-punk, and indie bands treated PureVolume like oxygen — Paramore, Fall Out Boy, All Time Low, Hawthorne Heights, and a thousand unsigned friend groups shared the same homepage grammar.',
    era: 'peak',
    highlights: [
      'Emo / pop-punk / indie discovery',
      'CMJ & SXSW presence',
      'MySpace-era social graph',
    ],
  },
  {
    id: 'spinmedia',
    year: '2010',
    title: 'SpinMedia acquisition',
    summary:
      'Pop-culture conglomerate SpinMedia acquires PureVolume. The portal becomes one node in a larger media network — editorial scale up, indie identity under pressure.',
    era: 'corporate',
    highlights: ['SpinMedia (Buzznet / Spin orbit)'],
  },
  {
    id: 'hive',
    year: '2016',
    title: 'Sold to Hive Media',
    summary:
      'SpinMedia sells PureVolume (with Idolator and Buzznet) to Hive Media. Another ownership shift as streaming giants finish rewriting how discovery works.',
    era: 'corporate',
    highlights: ['Hive Media', 'Idolator + Buzznet package deal'],
  },
  {
    id: 'shutdown',
    year: '2018',
    title: 'Lights out',
    summary:
      'April 2018: bands get a deadline to download their files. June 30, 2018: PureVolume’s music service shuts down after nearly fifteen years. The portal that launched careers goes dark.',
    era: 'decline',
    highlights: ['Download window → Apr 30, 2018', 'Service end → Jun 30, 2018'],
  },
  {
    id: 'gap',
    year: '2019–25',
    title: 'The missing portal',
    summary:
      'Streaming wins distribution. TikTok wins virality. What’s missing is the PureVolume job: a place to find unsigned friend-group bands, keep a taste diary like Letterboxd, and still look up anyone in the contemporary catalog — without becoming another player.',
    era: 'decline',
    highlights: ['No spiritual successor yet'],
  },
  {
    id: 'staticvolume',
    year: '2026',
    title: 'StaticVolume',
    summary:
      'A modern PureVolume-shaped portal: editorial mosaic, A–Z artists, Find for unsigned/new acts, catalog search (artist · song · genre), and Letterboxd-style log / review / list. Downloads and reposts for artists. No in-app music player.',
    era: 'revival',
    highlights: [
      'Portal aesthetic restored',
      'Letterboxd taste layer',
      'Unsigned finds + Spotify-era catalog target',
      'History timeline (you are here)',
    ],
  },
];

export const TIMELINE_ERA_LABEL: Record<TimelineEra, string> = {
  origin: 'Origin',
  launch: 'Launch',
  peak: 'Peak discovery',
  corporate: 'Ownership shifts',
  decline: 'Sunset',
  revival: 'Revival',
};
