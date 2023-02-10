export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/checkout", "/api/keys/:path*", "/api/orders/:path*"],
};
