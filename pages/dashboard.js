import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const DashboardPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session.user.isAdmin) {
      router.push("/");
    }
  }, [session]);

  return <div>DashboardPage</div>;
};

export default DashboardPage;
