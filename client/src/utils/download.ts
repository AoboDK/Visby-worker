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

export function downloadSupremoFile(): void {
  const os = detectOS();
  
  let downloadUrl: string;
  
  switch (os) {
    case 'windows':
      // Direct download link for Windows
      downloadUrl = 'https://www.supremocontrol.com/download-supremo/#download';
      break;
    case 'mac':
      // Direct download link for Mac DMG
      downloadUrl = 'https://www.nanosystems.it/public/download/macOS/Supremo.dmg';
      break;
    default:
      // Fallback to Windows download for other systems
      downloadUrl = 'https://www.supremocontrol.com/download-supremo/#download';
      alert('Vi kunne ikke automatisk detektere dit operativsystem. Åbner Windows download-siden.');
      break;
  }

  // Open download URL - Mac DMG will download directly, Windows opens download page
  window.open(downloadUrl, '_blank');
}
