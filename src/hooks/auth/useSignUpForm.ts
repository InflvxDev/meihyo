import { useState } from 'react';
import type { ChangeEvent, SyntheticEvent } from 'react';

export interface SignUpData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpResponse {
  mensaje: string;
  usuario: {
    id: string;
    email: string;
  };
  sesionIniciada: boolean;
  error?: string;
}

export const useSignUpForm = () => {
  const [formData, setFormData] = useState<SignUpData>({ 
    email: '', 
    password: '',
    confirmPassword: '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validación de contraseñas coincidentes
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/signUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data: SignUpResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en el registro');
      }
      
      // Redirigir al dashboard después de registro exitoso
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return {
    formData,
    error,
    loading,
    handleSubmit,
    handleChange,
  };
};
