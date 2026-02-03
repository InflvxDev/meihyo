import { useLoginForm } from '../../hooks/auth/useLoginForm';

const LoginForm = () => {
  const { formData, error, loading, handleSubmit, handleChange } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto">
      {/* Campo Email */}
      <div>
        <label className="block text-background text-sm font-medium mb-2">
          Correo Electrónico
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-foreground border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="tu@email.com"
        />
      </div>

      {/* Campo Contraseña */}
      <div>
        <label className="block text-background text-sm font-medium mb-2">
          Contraseña
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-foreground border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="••••••••"
        />
      </div>

      {/* ... (El resto del JSX del formulario permanece igual) ... */}
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input type="checkbox" className="h-4 w-4 text-primary border-secondary rounded" />
          <span className="ml-2 text-background text-sm">Recordarme</span>
        </label>
        <a href="#" className="text-primary text-sm hover:text-primary/80">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </button>

      <p className="text-center text-background text-sm">
        ¿No tienes una cuenta?{' '}
        <a href="/signup" className="text-primary font-medium hover:text-primary/80">
          Regístrate aquí
        </a>
      </p>
    </form>
  );
};

export default LoginForm;