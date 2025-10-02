export async function fetchRequest(
  url: string,
  headers?: Record<string, string>
) {
  try {
    const apiUrl = url.startsWith('/api') ? url : `/api${url}`;

    const config: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    const response = await fetch(apiUrl, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function createRequest(
  url: string,
  body: unknown,
  headers?: Record<string, string>
) {
  try {
    const apiUrl = url.startsWith('/api') ? url : `/api${url}`;

    const config: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(apiUrl, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Post error:', error);
    throw error;
  }
}

export async function updateRequest(
  url: string,
  body: unknown,
  headers?: Record<string, string>
) {
  try {
    const apiUrl = url.startsWith('/api') ? url : `/api${url}`;

    const config: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(apiUrl, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Put error:', error);
    throw error;
  }
}

export async function deleteRequest(
  url: string,
  headers?: Record<string, string>
) {
  try {
    const apiUrl = url.startsWith('/api') ? url : `/api${url}`;

    const config: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    const response = await fetch(apiUrl, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
}
