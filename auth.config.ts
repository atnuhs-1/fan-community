import { NextAuthConfig } from "next-auth";
import { Provider } from "next-auth/providers";
import GitHub from "next-auth/providers/github";
import google from "next-auth/providers/google";

const providers: Provider[] = [google];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export default {
    providers,
    debug: true,
  //   pages: {
  //     signIn: "auth/login",
  //   },
  } satisfies NextAuthConfig