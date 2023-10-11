import { Court } from "../utils/models";

export const checkReservations = (courts: Court[]) => {
	let reservations: any = {};
	courts.forEach((court: Court) => {
		let courtReservations: string[] = [];
		court.reservations.forEach((reservation: any) => {
			courtReservations.push(
				`${reservation.reservedHour}:${reservation.reservedMinutes}`,
			);
		});
		reservations[court.name] = courtReservations;
	});
	return reservations;
};

export const calculatePriorLimit = (
	hour: string,
	hoursBefore: number,
): string => {
	// Dividir hora
	const [h, m] = hour.split(":");

	// Convertir a números
	let newH = parseInt(h);
	let newM = parseInt(m);

	// Restar horas
	newH -= Math.floor(hoursBefore);

	// Restar minutos
	newM -= Math.round((hoursBefore % 1) * 60);

	// Corregir minutos negativos
	if (newM < 0) {
		newM += 60;
		newH--;
	}

	// Formatear con 02 dígitos
	const newHStr = newH.toString().padStart(2, "0");
	const newMStr = newM.toString().padStart(2, "0");

	return `${newHStr}:${newMStr}`;
};

export const calculatePostLimit = (
	hour: string,
	hoursAfter: number,
): string => {
	const [h, m] = hour.split(":");

	let newH = parseInt(h);
	let newM = parseInt(m);

	newH += Math.floor(hoursAfter);
	newM += Math.round((hoursAfter % 1) * 60);

	if (newM >= 60) {
		newM -= 60;
		newH++;
	}

	const newHStr = newH.toString().padStart(2, "0");
	const newMStr = newM.toString().padStart(2, "0");

	return `${newHStr}:${newMStr}`;
};

export const between = (arr: string[], start: string, end: string) => {
	return arr.filter((hour) => {
		return hour >= start && hour <= end;
	});
};
