import { auth } from "@/lib/auth/lucia/lucia";
import { RequestContext } from "rakkasjs";

export async function beforePageLuciaMiddleware(ctx: RequestContext<unknown>) {
  if (ctx.url.pathname.match("^/dashboard")) {
    const request = ctx.request;
    const authRequest = auth.handleRequest(request);
    const session = await authRequest.validate(); // or `authRequest.validateBearerToken()`
    if (session) {
      const user = session.user;
      const username = user.username;
      // ctx.queryClient.setQueryData("user", user);
    }
  }
}
