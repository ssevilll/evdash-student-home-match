import { createFileRoute, redirect } from "@tanstack/react-router";
import { pageMeta } from "@/lib/meta";
export const Route = createFileRoute("/roommates")({ head: () => pageMeta("Tələbə evləri", "Bakıda universitetə yaxın mənzilləri kəşf et."), beforeLoad: () => { throw redirect({ to: '/homes', statusCode: 301 }); } });
