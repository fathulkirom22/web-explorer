const apiUrl = import.meta.env.VITE_API_URL;

export const getFiles = async (id: number | null = null) => {
    const path = id ? `files/${id}` : 'files';
    const response = await fetch(`${apiUrl}/${path}`);
    return response.json();
};

export const getFilesAncestors = async (id: number | null = null) => {
    const path = `files/${id}/ancestors`;
    const response = await fetch(`${apiUrl}/${path}`);
    return response.json();
};

export const postFile = async (payload: {name: string, type: string, parentId: number | null}) => {
    const path = 'files';
    const response = await fetch(`${apiUrl}/${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    return response;
};