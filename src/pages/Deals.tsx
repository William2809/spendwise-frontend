import nullpng from "../assets/null.png";
import Card from "../components/Card";
import deals from "../assets/deals.json";

function Deals() {
	const user = JSON.parse(localStorage.getItem("user")!);

	console.log(deals);

	return (
		<div className="px-5 pt-4">
			<div className="flex items-center gap-3">
				<img
					src={user.picture ? `${user.picture}` : nullpng}
					className="rounded-full h-10"
					alt="User Profile"
				/>
				<h2 className="text-primary-muted font-semibold text-base">
					{user.name}
				</h2>
			</div>

			<div className="mt-4">
				<h2 className="font-semibold text-[24px] mb-4">Student Deals</h2>
				{deals.map((deal: any, index) => (
					<div
						className="mb-6"
						key={index}
					>
						<Card
							title={deal.name}
							text={deal.description}
							imgSrc={deal.image}
							next={deal.link}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default Deals;
