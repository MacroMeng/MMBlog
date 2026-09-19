/**
 * 时间线页数据源（纯内容）。
 * 页面展示与筛选规则由 src/config/timelineConfig.ts 控制。
 */
import type { TimelineItem } from "@/types/timelineConfig";

export const timelineData: TimelineItem[] = [
	{
		title: "MMSite 3rd Update",
		date: "2026.09",
		category: "milestone",
		subtitle: "Where thoughts live.",
		description: "采用 Shirone 重构了整个博客站点。",
		tags: ["Blog"],
		links: [
			{
				label: "GitHub",
				url: "https://github.com/MacroMeng/MMBlog",
				icon: "fa6-brands:github",
			},
		],
		icon: "material-symbols:add-home",
	},
	{
		title: "OMI Launch",
		date: "2026.05.11",
		category: "milestone",
		subtitle: "IWB Stuffs in short",
		description: "OhMyIWB 项目起步。",
		tags: ["OMI", "Hexo"],
		links: [
			{
				label: "GitHub Repository",
				url: "https://github.com/MacroMeng/OhMyIWB",
				icon: "fa6-brands:github",
			},
		],
		icon: "material-symbols:lightbulb-2",
	},
];

/** 获取所有时间线数据列表 */
export function getTimelineList(): TimelineItem[] {
	return timelineData;
}
