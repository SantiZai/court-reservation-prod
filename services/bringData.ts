import axios from "axios";

export const bringUserByEmail = async (email: string) => {
	try {
		const res = await axios.get(`https://hobart-cassowary-mzbn.2.us-1.fl0.io/players/exists?email=${email}`);
		return res.data;
	} catch (err) {
		return err;
	}
};

export const bringClub = async (clubName: string) => {
	try {
		const res = await axios.get(`https://hobart-cassowary-mzbn.2.us-1.fl0.io/clubs?clubName=${clubName}`);
		return res.data;
	} catch (err) {
		return err;
	}
};

export const bringClubById = async (id: string) => {
	try {
		const res = await axios.get(`https://hobart-cassowary-mzbn.2.us-1.fl0.io/clubs/${id}`);
		return res.data;
	} catch (err) {
		return err;
	}
};

export const bringCourts = async (clubName: string) => {
	try {
		const res = await axios.get(`https://hobart-cassowary-mzbn.2.us-1.fl0.io/courts?club=${clubName}`);
		return res.data;
	} catch (err) {
		return err;
	}
};

export const bringCourt = async (id: string) => {
	try {
		const res = await axios.get(`https://hobart-cassowary-mzbn.2.us-1.fl0.io/courts/${id}`);
		return res.data;
	} catch (err) {
		return err;
	}
};
