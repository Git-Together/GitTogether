export const CHECKOUT_FILE = 'CHECKOUT_FILE';
export const RETURN_FILE = 'RETURN_FILE';

export function checkoutFile(repoName, fileId, userName) {
  return {
    type: CHECKOUT_FILE,
    repoName,
    fileId,
    userName
  };
}

export function returnFile(repoName, fileId, userName){
  return {
    type: RETURN_FILE,
    repoName,
    fileId,
    userName
  }
}
