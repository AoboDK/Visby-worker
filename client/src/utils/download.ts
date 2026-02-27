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
  
  let fileName: string;
  
  switch (os) {
    case 'windows':
      fileName = 'Supremo.exe';
      break;
    case 'mac':
      fileName = 'Supremo.dmg';
      break;
    default:
      // Fallback to Windows exe for other systems
      fileName = 'Supremo.exe';
      alert('Vi kunne ikke automatisk detektere dit operativsystem. Downloader Windows-version.');
      break;
  }

  // Create temporary link and trigger download
  const link = document.createElement('a');
  link.href = `/${fileName}`;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
