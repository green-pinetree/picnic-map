export const httpPost = async (url: string, body: object) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (response.status !== 200) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  return response.json();
};

export const httpGet = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status !== 200) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  return response.json();
};

export const httpDelete = async (url: string) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status !== 200) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  return response.json();
};
export const httpPut = async (url: string, body: object) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (response.status !== 200) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  return response.json();
};
