// ===== API PARA COMUNICACIÓN CON BACKEND =====
// Este archivo se usará cuando implementes el backend

const API = {
  BASE_URL: 'http://localhost:4000/api',
  
  // Obtener o crear perfil
  async obtenerPerfil(username) {
    try {
      const response = await fetch(`${this.BASE_URL}/profiles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });
      return await response.json();
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      return null;
    }
  },
  
  // Guardar progreso
  async guardarProgreso(profileId, progreso) {
    try {
      const response = await fetch(`${this.BASE_URL}/profiles/${profileId}/progress`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progress: progreso })
      });
      return await response.json();
    } catch (error) {
      console.error('Error al guardar progreso:', error);
      return null;
    }
  }
};