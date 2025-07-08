import Layout from "@/components/Layout";

export const metadata = {
  title: "Dashboard - The Content Lab",
  description: "Dashboard for The Content Lab"
};

export default function DashboardLayout({ children }) {
  return <Layout>{children}</Layout>;
}