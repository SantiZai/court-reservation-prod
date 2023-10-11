import axios from "axios";
import { Court } from "../utils/models";

export const updateCourt = async (id: string, court: Partial<Court>) => {
	try {
		const res = await axios.patch(`https://hobart-cassowary-mzbn.2.us-1.fl0.io/courts/${id}`, court);
		return res.status;
	} catch (err) {
		return err;
	}
};
