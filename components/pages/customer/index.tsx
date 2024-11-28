"use client";
import { getGames } from "@/utils/custom-swr";
import Image from "next/image";
import Card from "../../ui/card";
import Loading from "@/components/ui/loading";

const Index = () => {
	const { gamelist, getgameLoading, error } = getGames();

	if (getgameLoading) return <Loading />;

	return (
		<>
			<div className="grid grid-cols-2 sm:grid-cols-5 gap-5">
				{gamelist?.map((data, key) => {
					return (
						<Card
							redirect={true}
							link={"/" + data.game_code + "/" + data.name}
							className="bg-slate-900 hover:shadow-lg hover:shadow-sky-500 text-center duration-500 ease-in-out"
							key={key}
						>
							<Image
								src={"/product-images/" + data.image}
								alt={data.name}
								width={1000}
								height={1000}
								className="w-auto h-auto"
							/>
							<p className="mt-5">{data.name}</p>
						</Card>
					);
				})}
			</div>
		</>
	);
};

export default Index;
