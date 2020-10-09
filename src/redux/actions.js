
export function addContact(data) {
  const { nama, token } = data;

  return {
    type: "GRANTED",
    nama,
    token
  };
}

export function removeContact(nama) {
  return {
    type: "REVOKE",
    nama
  };
}