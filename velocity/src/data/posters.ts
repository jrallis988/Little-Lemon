export type PosterId =
  | 'hockey'
  | 'basketball'
  | 'running'
  | 'soccer'
  | 'tennis'
  | 'snowboard'

export interface Poster {
  id: PosterId
  number: string
  sport: string
  concept: string
  athlete: string
  location: string
  event: string
  stat: string
  statLabel: string
  image: string
  accent: string
  explore: string[]
  composition: string
  hierarchyNote: string
}

export const posters: Poster[] = [
  {
    id: 'hockey',
    number: '01',
    sport: 'Hockey',
    concept: 'RELEASE',
    athlete: 'Marcus Hale',
    location: 'Montreal',
    event: 'Northern Ice Series',
    stat: '97 MPH',
    statLabel: 'Shot Velocity',
    image: '/velocity/dist/posters/hockey.jpg',
    accent: '#7eb8c9',
    explore: ['Stick movement', 'Ice texture', 'Directional lines', 'Puck trajectory', 'Large typography'],
    composition: 'Diagonal thrust from lower left. Athlete breaks oversized RELEASE. Ice grain and stick-path lines reinforce the release vector.',
    hierarchyNote: 'Concept word dominates. Athlete silhouette cuts type. Stat anchors lower right.',
  },
  {
    id: 'basketball',
    number: '02',
    sport: 'Basketball',
    concept: 'RISE',
    athlete: 'Jordan Vale',
    location: 'Chicago',
    event: 'Court Campaign 24',
    stat: '42"',
    statLabel: 'Vertical Leap',
    image: '/velocity/dist/posters/basketball.jpg',
    accent: '#e87722',
    explore: ['Vertical composition', 'Height', 'Player silhouette', 'Court geometry', 'Oversized typography'],
    composition: 'Tall vertical stack. Athlete climbs the letterforms. Court lane lines pull the eye upward.',
    hierarchyNote: 'Extreme vertical hierarchy. Number and concept share the sky plane.',
  },
  {
    id: 'running',
    number: '03',
    sport: 'Running',
    concept: 'DRIVE',
    athlete: 'Elena Park',
    location: 'Berlin',
    event: 'Track Authority',
    stat: '00:09.81',
    statLabel: '100m Split',
    image: '/velocity/dist/posters/running.jpg',
    accent: '#c8102e',
    explore: ['Horizontal movement', 'Motion', 'Track markings', 'Timing/numbers', 'Cropped typography'],
    composition: 'Wide lateral sweep. Cropped DRIVE bleeds left. Lane lines and timing marks pace the sprint.',
    hierarchyNote: 'Motion left-to-right. Numeric type is a graphic equal to photography.',
  },
  {
    id: 'soccer',
    number: '04',
    sport: 'Soccer',
    concept: 'STRIKE',
    athlete: 'Diego Navarro',
    location: 'Madrid',
    event: 'Field Series',
    stat: '118 km/h',
    statLabel: 'Strike Speed',
    image: '/velocity/dist/posters/soccer.jpg',
    accent: '#2f6b4f',
    explore: ['Ball trajectory', 'Player movement', 'Field geometry', 'Directional composition'],
    composition: 'Impact-centered. Trajectory arc from boot to frame edge. Pitch lines as quiet structure.',
    hierarchyNote: 'Contact moment at optical center. Type frames the strike without covering it.',
  },
  {
    id: 'tennis',
    number: '05',
    sport: 'Tennis',
    concept: 'IMPACT',
    athlete: 'Sofia Ren',
    location: 'Melbourne',
    event: 'Hard Court Edit',
    stat: '127 MPH',
    statLabel: 'Serve Speed',
    image: '/velocity/dist/posters/tennis.jpg',
    accent: '#d4e157',
    explore: ['Ball position', 'Racket movement', 'Court lines', 'Controlled negative space'],
    composition: 'Restrained negative space. Single contact point. Court geometry as fine rules.',
    hierarchyNote: 'Quiet field, loud moment. Type stays disciplined so photography leads.',
  },
  {
    id: 'snowboard',
    number: '06',
    sport: 'Snowboarding',
    concept: 'AIR',
    athlete: 'Kai Morrow',
    location: 'Aspen',
    event: 'Alpine Descent',
    stat: '28 ft',
    statLabel: 'Air Height',
    image: '/velocity/dist/posters/snowboard.jpg',
    accent: '#9bb5c8',
    explore: ['Scale', 'Environment', 'Negative space', 'Height', 'Dramatic photography'],
    composition: 'Athlete suspended in vast sky/snow field. Scale contrast between body and landscape.',
    hierarchyNote: 'Environment is the stage. AIR sits small until you feel the drop.',
  },
]

export const moments = [
  'The release.',
  'The jump.',
  'The turn.',
  'The impact.',
  'The sprint.',
  'The finish.',
]

export const craftSkills = [
  'Photoshop compositing',
  'Illustrator graphics',
  'Typography',
  'Photography',
  'Art direction',
  'Image treatment',
  'Layout',
  'Visual hierarchy',
  'Color',
  'Texture',
  'Sports design',
  'Poster design',
  'Campaign consistency',
  'Print production',
  'Digital adaptation',
]
