import { NavLink } from "react-router-dom";
import { TPath, TSiderItem } from "../type";

export const sidebarItemsGenerator = (items: TPath[], role: string) => {
	const sidebar = items.reduce((acc: TSiderItem[], currentItem) => {
		if (currentItem.path && currentItem.element) {
			acc.push({
				key: currentItem.name as string,
				label: (
					<NavLink to={`/${role}/${currentItem.path}`}>
						{currentItem.name}
					</NavLink>
				),
			});
		}

		if (currentItem.children) {
			acc.push({
				key: currentItem.name,
				label: currentItem.name,
				children: currentItem.children.map((item) => {
					if (item.name) {
						return {
							key: item.name,
							label: (
								<NavLink to={`/${role}/${item.path}`}>
									{item.name}
								</NavLink>
							),
						};
					}
				}),
			});
		}

		return acc;
	}, []);
	return sidebar;
};
