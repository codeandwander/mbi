export function getSessionId() {
  return localStorage.getItem('sessionId');
}

export function setSessionId() {
  if (getSessionId() === null) {
    const uuid = uuidv4();
    localStorage.setItem('sessionId', uuid);
  }
}
