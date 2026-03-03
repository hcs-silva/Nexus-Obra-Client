import { describe, expect, it } from "vitest";
import { mapAuthPayloadToUser } from "./authProvider";

describe("mapAuthPayloadToUser", () => {
  it("maps server auth payload into app user shape", () => {
    const user = mapAuthPayloadToUser({
      clientId: "client-1",
      userId: "user-1",
      username: "admin",
      role: "Admin",
      resetPassword: false,
    });

    expect(user).toEqual({
      clientId: "client-1",
      userId: "user-1",
      username: "admin",
      role: "Admin",
      resetPassword: false,
    });
  });
});
