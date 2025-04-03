import { Tab } from "@/components/Tab";
import type { TTodoFilters } from "@/types";

const tabData: Array<TTodoFilters> = ["all", "active", "completed"];

export const Tabs: React.FC = () => {

	return (
		<div className="flex space-x-2 ">
			{
				tabData.map(item => <Tab text={item} key={item} />)
			}
		</div>
	);
};