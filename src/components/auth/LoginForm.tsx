import { useLoginForm } from '../../hooks/auth/useLoginForm';

const LoginForm = () => {
  const { formData, error, loading, handleSubmit, handleChange, showPassword, setShowPassword } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto">
      {/* Campo Email */}
      <div>
        <label className="block text-foreground text-sm font-medium mb-2">
          Correo Electrónico
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-secondary/10 border border-secondary/20 rounded-lg text-secondary focus:outline-none focus:border-primary/50 focus:bg-secondary/20 transition-all"
          placeholder="tu@email.com"
        />
      </div>

      {/* Campo Contraseña */}
      <div>
        <label className="block text-foreground text-sm font-medium mb-2">
          Contraseña
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-secondary/10 border border-secondary/20 rounded-lg text-secondary focus:outline-none focus:border-primary/50 focus:bg-secondary/20 transition-all"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 w-5 h-5 text-secondary/60 hover:text-secondary transition-colors"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" fill="currentColor" viewBox="0 0 959.95 959.95" xmlSpace="preserve"><path id="SVGRepo_iconCarrier" d="M7.675 503.075c41.1 88.9 106.3 164.2 188.5 217.801 84.5 55 182.6 84.1 283.8 84.1s199.3-29.1 283.8-84.2c82.2-53.5 147.4-128.8 188.5-217.7l4.9-10.5c3.7-8 3.7-17.199 0-25.199l-4.9-10.5c-41.1-88.9-106.3-164.2-188.5-217.8-84.5-55-182.6-84.1-283.8-84.1s-199.3 29.1-283.8 84.2c-82.2 53.5-147.4 128.8-188.5 217.7l-4.9 10.5a30 30 0 0 0 0 25.199zm696-171.8c57.6 37.6 104.7 88.7 137.2 148.7-32.5 60.1-79.601 111.2-137.2 148.7-32.101 20.899-66.8 37.1-103 48.2 66.2-40.601 110.3-113.601 110.3-196.9s-44.1-156.3-110.3-197c36.2 11.2 70.899 27.3 103 48.3m-447.401 0c32.101-20.9 66.8-37.1 103-48.2-66.2 40.6-110.3 113.6-110.3 196.9s44.1 156.3 110.3 197c-36.2-11.1-70.899-27.3-103-48.2-57.6-37.6-104.699-88.7-137.199-148.7 32.5-60.2 79.6-111.3 137.199-148.8"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 -5 16 16"><g id="SVGRepo_iconCarrier"><path id="Path_111" d="M34 11a9.33 9.33 0 0 1-7.94-5.263.5.5 0 0 1 .88-.474A8.33 8.33 0 0 0 34 10a8.33 8.33 0 0 0 7.06-4.737.5.5 0 1 1 .88.474A9.33 9.33 0 0 1 34 11" transform="translate(-26 -5)"/></g></svg>
            )}
          </button>
        </div>
      </div>

      {/* ... (El resto del JSX del formulario permanece igual) ... */}
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input type="checkbox" className="h-4 w-4 text-primary border-secondary rounded" />
          <span className="ml-2 text-secondary text-sm">Recordarme</span>
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

      <p className="text-center text-secondary text-sm">
        ¿No tienes una cuenta?{' '}
        <a href="/signup" className="text-primary font-medium hover:text-primary/80">
          Regístrate aquí
        </a>
      </p>
    </form>
  );
};

export default LoginForm;