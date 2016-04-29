const INSTALLER_BASE_URI = 'https://github.com/octoblu/electron-meshblu-connector-installer';
const INSTALLER_TAG = 'v4.0.2';

export function getInstallerUri({ platform }) {
  const ext = getFileExtension({ platform });
  return `${INSTALLER_BASE_URI}/releases/download/${INSTALLER_TAG}/MeshbluConnectorInstaller-${platform}.${ext}`;
}

export function getDownloadUri({ uri, fileName }) {
  const uriEncoded = encodeURIComponent(uri);
  const fileNameEncoded = encodeURIComponent(fileName);
  return `https://file-downloader.octoblu.com/download?fileName=${fileNameEncoded}&uri=${uriEncoded}`
}

export function getFileName({ otp, platform }) {
  const ext = getFileExtension({ platform });
  return `MeshbluConnectorInstaller-${otp}.${ext}`;
}

export function getFileExtension({ platform }) {
  if (/^darwin/.test(platform)) {
    return 'dmg';
  }
  return 'zip';
}
