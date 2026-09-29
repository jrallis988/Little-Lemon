export type ScreenId =
  | 'home'
  | 'device-info'
  | 'print-job'
  | 'ribbon-calibration'
  | 'printhead-wizard'
  | 'zbi-programs'
  | 'wlan-security'
  | 'wireless-ip'
  | 'wpa-credentials'
  | 'label-offset'
  | 'darkness'
  | 'restore-network'
  | 'restore-status'
  | 'touch-calibration';

export type ScreenMeta = {
  id: ScreenId;
  title: string;
  shortTitle: string;
  group: 'operations' | 'maintenance' | 'network' | 'print' | 'system';
  description: string;
};

export const SCREENS: ScreenMeta[] = [
  {
    id: 'home',
    title: 'Print Status Dashboard',
    shortTitle: 'Home',
    group: 'operations',
    description: 'Live printer status and shortcuts',
  },
  {
    id: 'device-info',
    title: 'Printer & Device Info',
    shortTitle: 'Device',
    group: 'operations',
    description: 'Hardware identity and firmware',
  },
  {
    id: 'print-job',
    title: 'Active Print Job',
    shortTitle: 'Job',
    group: 'operations',
    description: 'Real-time job progress',
  },
  {
    id: 'ribbon-calibration',
    title: 'Ribbon Calibration',
    shortTitle: 'Ribbon',
    group: 'maintenance',
    description: 'Reload ribbon assembly',
  },
  {
    id: 'printhead-wizard',
    title: 'Printhead Assembly',
    shortTitle: 'Head',
    group: 'maintenance',
    description: 'Open and inspect printhead',
  },
  {
    id: 'zbi-programs',
    title: 'ZBI Programs',
    shortTitle: 'ZBI',
    group: 'operations',
    description: 'Run automation scripts',
  },
  {
    id: 'wlan-security',
    title: 'WLAN Security',
    shortTitle: 'WLAN',
    group: 'network',
    description: 'Wireless auth protocol',
  },
  {
    id: 'wireless-ip',
    title: 'Wireless IP Address',
    shortTitle: 'IP',
    group: 'network',
    description: 'Manual IP configuration',
  },
  {
    id: 'wpa-credentials',
    title: 'WPA Credentials',
    shortTitle: 'WPA',
    group: 'network',
    description: 'Username and password',
  },
  {
    id: 'label-offset',
    title: 'Label Offset',
    shortTitle: 'Offset',
    group: 'print',
    description: 'X/Y print alignment',
  },
  {
    id: 'darkness',
    title: 'Darkness Level',
    shortTitle: 'Darkness',
    group: 'print',
    description: 'Thermal intensity',
  },
  {
    id: 'restore-network',
    title: 'Restore Network',
    shortTitle: 'Restore',
    group: 'system',
    description: 'Confirm network reset',
  },
  {
    id: 'restore-status',
    title: 'Restoration Status',
    shortTitle: 'Status',
    group: 'system',
    description: 'Network restore progress',
  },
  {
    id: 'touch-calibration',
    title: 'Touch Calibration',
    shortTitle: 'Touch',
    group: 'system',
    description: 'Multi-point accuracy grid',
  },
];

export const SCREEN_BY_ID = Object.fromEntries(
  SCREENS.map((s) => [s.id, s]),
) as Record<ScreenId, ScreenMeta>;
