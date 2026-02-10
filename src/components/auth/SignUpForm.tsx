import { useSignUpForm } from '../../hooks/auth/useSignUpForm';

const SignUpForm = () => {
  const { formData, error, loading, handleSubmit, handleChange, showPassword, setShowPassword } = useSignUpForm();

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
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={8}
          className="w-full px-4 py-3 bg-secondary/10 border border-secondary/20 rounded-lg text-secondary focus:outline-none focus:border-primary/50 focus:bg-secondary/20 transition-all"
          placeholder="••••••••"
        />
        <p className="text-secondary/70 text-xs mt-1">
          Mínimo 8 caracteres
        </p>
      </div>

      {/* Campo Confirmar Contraseña */}
      <div>
        <label className="block text-foreground text-sm font-medium mb-2">
          Confirmar Contraseña
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          minLength={8}
          className="w-full px-4 py-3 bg-secondary/10 border border-secondary/20 rounded-lg text-secondary focus:outline-none focus:border-primary/50 focus:bg-secondary/20 transition-all"
          placeholder="••••••••"
        />
      </div>

      {/* Checkbox para mostrar/ocultar contraseña */}
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={showPassword}
          onChange={(e) => setShowPassword(e.target.checked)}
          className="w-4 h-4 rounded border-secondary text-primary focus:ring-primary cursor-pointer"
          id="showPassword"
        />
        <label htmlFor="showPassword" className="ml-2 text-foreground text-sm cursor-pointer">
          Mostrar contraseña
        </label>
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
        {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
      </button>

      <p className="text-center text-secondary text-sm">
        ¿Ya tienes una cuenta?{' '}
        <a href="/login" className="text-primary font-medium hover:text-primary/80">
          Inicia sesión aquí
        </a>
      </p>
    </form>
  );
};

export default SignUpForm;
