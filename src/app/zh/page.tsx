import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "中文资源",
  description:
    "查找医生、预约就诊，并为您在波士顿儿童医院的就诊做好准备。",
};

const resources = [
  {
    title: "查找医生",
    body: "按姓名、专科或语言搜索儿科专家。",
    href: "/find-a-doctor",
  },
  {
    title: "预约就诊",
    body: "提交预约申请，开始护理流程。",
    href: "/appointments/request",
  },
  {
    title: "就诊准备",
    body: "了解需要携带的物品、如何到达，以及如何帮助孩子做好准备。",
    href: "/patients-families/prepare-for-your-visit",
  },
  {
    title: "MyChildren's 门户",
    body: "查看结果、消息和预约的门户预览。",
    href: "/portal",
  },
  {
    title: "院区位置",
    body: "波士顿主院区及周边社区医疗中心。",
    href: "/locations",
  },
  {
    title: "急诊科",
    body: "急诊信息与候诊时间指引。",
    href: "/emergency",
  },
];

export default function MandarinPage() {
  return (
    <>
      <PageHero
        id="zh-heading"
        eyebrow="中文"
        title="我们提供中文支持"
        lead="浏览查找医疗服务、准备就诊以及联系护理团队的中文资源。"
        actions={
          <>
            <Button href="/appointments/request" variant="ocean">
              预约就诊
            </Button>
            <Button href="/find-a-doctor" variant="ghost-white">
              查找医生
            </Button>
          </>
        }
      />
      <div className="wrap py-s7 pb-s10" lang="zh-Hans">
        <div className="mb-s7 grid grid-cols-1 gap-s4 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="block rounded-md border border-border bg-white p-s5 no-underline transition-all hover:border-ocean hover:shadow-sm"
            >
              <h2 className="mb-s2 text-lg font-bold text-ocean">{item.title}</h2>
              <p className="text-sm font-light text-text-body">{item.body}</p>
            </Link>
          ))}
        </div>
        <p className="text-sm font-light text-text-meta">
          Traveling from outside the U.S.?{" "}
          <Link href="/international" className="font-bold text-ocean">
            International patients
          </Link>
        </p>
      </div>
    </>
  );
}
