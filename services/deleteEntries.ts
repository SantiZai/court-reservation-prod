import axios from "axios";

export const deleteReservation = async (id: string) => {
    try {
        const res = await axios.delete(
            `https://hobart-cassowary-mzbn.2.us-1.fl0.io/reservations/${id}`
        );
        return res.status;
    } catch (err) {
        return err;
    }
};
