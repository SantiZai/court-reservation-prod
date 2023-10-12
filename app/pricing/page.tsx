import "./pricing.css";
import Link from "next/link";

const PricingPage = () => {
	return (
		<div className="flex flex-col p-4">
			<div className="flex justify-end">Logo</div>
			<div>
				{/*TODO: Reformar los textos para hacerlos propios */}
				<div className="flex flex-col">
					<span>Sistema de Gestión de Clubes</span>
					<span>Automatiza la toma de reservas</span>
					<span>Digitalizá tu complejo deportivo desde $... por mes</span>
					<Link href="#planes" className="btn-secondary px-3 py-1 rounded-md">
						Ver planes
					</Link>
				</div>
				<div className="flex flex-col">
					<span>Automatización de reservas</span>
					<span>
						Mejore la experiencia de sus clientes con reservas instantáneas
					</span>
					<span>
						Podrán consultar la disponibilidad en todo momento y en tiempo real,
						pudiendo reservar con un click sin necesidad de una persona
						gestionando la reserva.
					</span>
					<Link
						href="#funcionalidades"
						className="btn-primary px-3 py-1 rounded-md"
					>
						Funcionalidades
					</Link>
				</div>
				<div id="planes" className="flex flex-col">
					<div className="flex flex-col">
						<span className="text-lg">Pruébalo ya gratis</span>
						<span>Gestiona tu club de forma 100% online</span>
						<span>
							Cambiate a la era digital y obten ya tu prueba 100% gratuita de 1
							mes para probar nuestro servicio.
						</span>
						<span>
							Tus clientes podrán consultar disponibilidad y reservar desde
							cualquier lugar en todo momento.
						</span>
					</div>
					<div>
						<span>Ver planes y precios</span>
					</div>
				</div>
				<div id="funcionalidades" className="flex flex-col">
					<div className="flex flex-col">
						<span className="text-lg">En simultáneo</span>
						<span>
							<strong>
								Maneja de forma online la toma de reservas en tu club
							</strong>
							, de manera simultánea con otros administradores.
						</span>
						<span>Sistema de control <strong>all time</strong> de cada reserva efectuada.</span>
					</div>
					<div>
						<Link href="/join">Prueba grauita</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PricingPage;
