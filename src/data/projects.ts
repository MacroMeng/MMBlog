/**
 * 项目页数据源（纯内容）。
 * 页面展示与筛选规则由 src/config/projectsConfig.ts 控制。
 */
import type { ProjectItem } from "@/types/projectsConfig";

export const projectsData: ProjectItem[] = [
	{
		key: "omi",
		title: "OhMyIWB",
		summary: "智在知互 思于识通 - 学生集体的独立思考录",
		category: "text",
		phase: "shipped",
		technologies: ["VitePress", "RSS"],
		icon: "material-symbols:chat",
		featured: true,
		repository: "https://ohmyiwb.mm666.qzz.io",
		year: "2026",
	},
];

/** 获取所有项目数据列表 */
export function getProjectsList(): ProjectItem[] {
	return projectsData;
}
