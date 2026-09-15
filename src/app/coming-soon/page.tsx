import PUFComingSoon from "@/components/PUFComingSoon";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PUF Coming Soon | Synergy PUF",
  description: "Next generation PUF insulation and panel solutions. Coming soon from Synergy PUF.",
};

export default function ComingSoonPage() {
  return <PUFComingSoon isStandalone={true} />;
}
