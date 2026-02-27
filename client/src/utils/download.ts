// client/src/utils/download.ts

export function detectOS(): 'windows' | 'mac' | 'other' {
  const userAgent = navigator.userAgent.toLowerCase();
  const platform = navigator.platform.toLowerCase();

  // Check for Mac
  if (
    platform.includes('mac') ||
    userAgent.includes('mac') ||
    userAgent.includes('macintosh')
  ) {
    return 'mac';
  }

  // Check for Windows
  if (
    platform.includes('win') ||
    userAgent.includes('windows') ||
    userAgent.includes('win32') ||
    userAgent.includes('win64')
  ) {
    return 'windows';
  }

  return 'other';
}

export function getBrowserName(): string {
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (userAgent.includes('edg')) return 'Edge';
  if (userAgent.includes('chrome')) return 'Chrome';
  if (userAgent.includes('safari') && !userAgent.includes('chrome')) return 'Safari';
  if (userAgent.includes('firefox')) return 'Firefox';
  if (userAgent.includes('opera') || userAgent.includes('opr')) return 'Opera';
  
  return 'din browser';
}

export function getDownloadLocationText(): string {
  const browser = getBrowserName();
  
  switch (browser) {
    case 'Chrome':
    case 'Edge':
      return 'nederst til venstre';
    case 'Safari':
      return 'øverst til højre';
    case 'Firefox':
      return 'øverst til højre';
    default:
      return 'i din browser';
  }
}

export interface DownloadInfo {
  fileName: string;
  downloadUrl: string;
  os: 'windows' | 'mac' | 'other';
}

export function getDownloadInfo(): DownloadInfo {
  const os = detectOS();
  
  let fileName: string;
  let downloadUrl: string;
  
  switch (os) {
    case 'windows':
      fileName = 'Supremo.exe';
      downloadUrl = 'https://www.nanosystems.com/public/download/Supremo.exe';
      break;
    case 'mac':
      fileName = 'Supremo.dmg';
      downloadUrl = 'https://www.nanosystems.com/public/download/macOS/stable/Supremo.dmg';
      break;
    default:
      fileName = 'Supremo.exe';
      downloadUrl = 'https://www.nanosystems.com/public/download/Supremo.exe';
      break;
  }
  
  return { fileName, downloadUrl, os };
}

export function downloadSupremoFile(): DownloadInfo {
  const downloadInfo = getDownloadInfo();
  
  // Trigger the download
  window.open(downloadInfo.downloadUrl, '_blank');
  
  return downloadInfo;
}
