import type { ComponentType } from 'react';
import type { ScreenId } from '../navigation/screens';
import { DarknessLevelControl } from './DarknessLevelControl';
import { DeviceInfoPanel } from './DeviceInfoPanel';
import { HomeDashboard } from './HomeDashboard';
import { LabelOffsetAdjustment } from './LabelOffsetAdjustment';
import { NetworkRestoreStatus } from './NetworkRestoreStatus';
import { PrintheadWizard } from './PrintheadWizard';
import { PrintJobProgress } from './PrintJobProgress';
import { RestoreNetworkPrompt } from './RestoreNetworkPrompt';
import { RibbonCalibrationWizard } from './RibbonCalibrationWizard';
import { TouchCalibrationGrid } from './TouchCalibrationGrid';
import { WirelessIpInput } from './WirelessIpInput';
import { WlanSecurityConfig } from './WlanSecurityConfig';
import { WpaCredentialsInput } from './WpaCredentialsInput';
import { ZbiProgramsMenu } from './ZbiProgramsMenu';

export const SCREEN_COMPONENTS: Record<ScreenId, ComponentType> = {
  home: HomeDashboard,
  'device-info': DeviceInfoPanel,
  'print-job': PrintJobProgress,
  'ribbon-calibration': RibbonCalibrationWizard,
  'printhead-wizard': PrintheadWizard,
  'zbi-programs': ZbiProgramsMenu,
  'wlan-security': WlanSecurityConfig,
  'wireless-ip': WirelessIpInput,
  'wpa-credentials': WpaCredentialsInput,
  'label-offset': LabelOffsetAdjustment,
  darkness: DarknessLevelControl,
  'restore-network': RestoreNetworkPrompt,
  'restore-status': NetworkRestoreStatus,
  'touch-calibration': TouchCalibrationGrid,
};
