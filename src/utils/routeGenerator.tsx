import { TDefaultChild, TPath, TRoute } from "../type";

export const routeGenerator = (items: TPath[], defaultChild: TDefaultChild) => {
	const routes = items.reduce(
		(acc: TRoute[], currentItem) => {
			if (currentItem.path && currentItem.element) {
				acc.push({
					path: currentItem.path,
					element: currentItem.element,
				});
			}
			if (currentItem.children) {
				currentItem.children.forEach((item) => {
					acc.push({ path: item.path, element: item.element });
				});
			}
			return acc;
		},
		[defaultChild]
	);
	return routes;
};
