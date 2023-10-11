import axios from "axios";

export const findCourts = async ({
	country,
	province,
	city,
	sport,
}: {
	country: string;
	province: string;
	city: string;
	sport: string;
}) => {
	const res = await axios.get(
		`https://hobart-cassowary-mzbn.2.us-1.fl0.io/clubs/search/results?country=${country}&province=${province}&city=${city}&sport=${sport}`,
	);
	if (!res) return console.log("Courts not founded");
	return res.data;
};
