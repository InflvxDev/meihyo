import React, { useState } from 'react';

export default function MobileMenu() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const closeMenu = () => {
		setIsOpen(false);
	};

	return (
		<>
			{/* Botón Hamburguesa */}
			<button
				id="menu-toggle"
				onClick={toggleMenu}
				className="md:hidden p-2 hover:bg-foreground/10 transition-all rounded-lg relative z-50 flex items-center justify-center"
				aria-label="Abrir menú"
			>
				<svg
					id="menu-icon"
					xmlns="http://www.w3.org/2000/svg"
					className={`w-6 h-6 fill-foreground transition-all duration-300 ${
						isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
					}`}
					viewBox="0 0 24 24"
				>
					<path d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2" />
				</svg>
				<svg
					id="close-icon"
					xmlns="http://www.w3.org/2000/svg"
					className={`w-6 h-6 fill-foreground transition-all duration-300 absolute ${
						isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
					}`}
					viewBox="0 0 24 24"
				>
					<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
				</svg>
			</button>

			{/* Overlay de fondo */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
					onClick={closeMenu}
				/>
			)}

			{/* Menú móvil con animación */}
			<div
				className={`fixed left-0 right-0 top-14 md:hidden border-t border-foreground/20 bg-background transition-all duration-300 ease-in-out z-40 ${
					isOpen
						? 'opacity-100 translate-y-0 visible'
						: 'opacity-0 -translate-y-4 invisible'
				}`}
			>
				<div className="px-4 py-4 grid grid-cols-2 gap-6 w-full">

					{/* Iniciar Sesión */}
					<a
						href="/login"
						onClick={closeMenu}
						className="bg-secondary/60 text-foreground text-sm px-2 py-2 rounded-lg text-center font-semibold hover:brightness-125 hover:bg-secondary/80 transition-all border border-secondary"
					>
						Iniciar Sesión
					</a>

					{/* Comienza tu viaje */}
					<a
						href="/signup"
						onClick={closeMenu}
						className="bg-primary/60 text-foreground text-sm px-2 py-2 rounded-lg text-center font-semibold hover:brightness-125 hover:bg-primary/80 transition-all border border-primary"
					>
						Comienza tu viaje
					</a>
				</div>
			</div>
		</>
	);
}
