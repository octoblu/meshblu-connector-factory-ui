import { connectorDetails } from '../services/detail-service';
const INSTALLER_BASE_URI = 'https://github.com/octoblu/electron-meshblu-connector-installer';

export function getFileExtension({ platform }) {
  if (/^darwin/.test(platform)) {
    return 'dmg';
  }
  return 'zip';
}

export function getInstallerUri({ platform }, callback) {
  connectorDetails({ connector: 'electron-meshblu-connector-installer' }, (error, info) => {
    if (error) return callback(error)
    const tag = info['dist-tags'].latest
    const ext = getFileExtension({ platform });
    callback(null, `${INSTALLER_BASE_URI}/releases/download/v${tag}/MeshbluConnectorInstaller-${platform}.${ext}`);
  })
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
