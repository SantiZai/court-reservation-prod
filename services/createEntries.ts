import { User, Reservation } from "../utils/models";
import axios from "axios";

export const createUser = async (user: User) => {
	const res = await axios.get(`https://hobart-cassowary-mzbn.2.us-1.fl0.io/players/exists?email=${user.email}`);
	if (res.data.status === 404) {
		const res = await axios.post(`${process.env.NEXT_PUBLIC_API}players`, user);
		return res.data;
	}
};

export const createReservation = async (reservation: Reservation) => {
	try {
		const res = await axios.post(`https://hobart-cassowary-mzbn.2.us-1.fl0.io/reservations`, reservation);
		return res.status;
	} catch (err) {
		console.error(err);
	}
};
