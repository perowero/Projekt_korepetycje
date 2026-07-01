    const downloadFile=async ({id,filename})=>{
        const token = localStorage.getItem('token');

  try {
    const response = await fetch(`http://localhost:8080/api/files/download/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("Nie udało się pobrać pliku z serwera.");
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename); 
    document.body.appendChild(link);
    link.click();

    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error("Błąd pobierania pliku:", error);
    alert("Wystąpił błąd podczas pobierania pliku.");
  }
    }

    export default downloadFile;
