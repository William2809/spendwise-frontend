import { AiOutlineHome, AiOutlineTags } from "react-icons/ai";
import { MdOutlineInsights, MdPersonOutline } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";

const iconMap: Record<string, JSX.Element> = {
	Home: (
		<AiOutlineHome
			size="32px"
			className="mx-2.5"
		/>
	),
	Deals: (
		<AiOutlineTags
			size="32px"
			className="mx-2.5"
		/>
	),
	Insights: (
		<MdOutlineInsights
			size="32px"
			className="mx-2.5"
		/>
	),
	Profile: (
		<MdPersonOutline
			size="32px"
			className="mx-2.5"
		/>
	),
};

interface Navitem {
	title: string;
	destination: string;
}

function Navbar() {
	const location = useLocation();
	const navitems: Navitem[] = [
		{ title: "Home", destination: "/home" },
		{ title: "Deals", destination: "/deals" },
		{ title: "Insights", destination: "/Insights" },
		{ title: "Profile", destination: "/profile" },
	];
	return (
		<div className="fixed bottom-0 z-20 bg-white w-full flex justify-between shadow-[0px_-2px_10px_rgba(0,0,0,0.25)] px-6">
			{navitems.map((navitem) => (
				<NavLink
					key={navitem.title}
					to={navitem.destination}
					className={`${
						location.pathname === navitem.destination
							? "text-primary"
							: "text-disabled"
					} flex items-center justify-center hover:text-primary py-1`}
				>
					<div className="flex flex-col justify-center items-center">
						{iconMap[navitem.title]}
						<span className="text-xs">{navitem.title}</span>
					</div>
				</NavLink>
			))}
		</div>
	);
}

export default Navbar;
