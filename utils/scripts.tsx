import Swal, { SweetAlertIcon, SweetAlertOptions } from "sweetalert2";

const Scripts = () => {
	const Alert = (
		icon: SweetAlertIcon,
		title: string,
		text: string,
		allowOutsideClick: boolean = false
	): void => {
		const options: SweetAlertOptions = {
			icon,
			title,
			text,
			allowOutsideClick,
		};

		Swal.fire<any>({
			icon,
			title,
			text,
			allowOutsideClick,
		});
	};

	const countdown = (timestamp: number, elementId: string) => {
		const targetDate = new Date(timestamp * 1000);

		const intervalId = setInterval(() => {
			const now = new Date();
			const timeDifference = targetDate.getTime() - now.getTime();

			// Pastikan elemen ditemukan
			const countdownElement = document.getElementById(elementId);
			if (!countdownElement) {
				console.warn(`Element with ID "${elementId}" not found.`);
				clearInterval(intervalId);
				return;
			}

			// Periksa apakah waktu telah berakhir
			if (timeDifference <= 0) {
				countdownElement.textContent = "Waktu Kadaluarsa!";
				clearInterval(intervalId);
				return;
			}

			// Hitung hari, jam, menit, dan detik tersisa
			const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			const minutes = Math.floor(
				(timeDifference % (1000 * 60 * 60)) / (1000 * 60)
			);
			const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

			// Update elemen dengan waktu hitung mundur yang diperbarui
			countdownElement.textContent = `${days} Hari, ${hours} Jam, ${minutes} Menit, ${seconds} Detik`;
		}, 1000);
	};

	return {
		Alert,
		countdown,
	};
};

export default Scripts;
