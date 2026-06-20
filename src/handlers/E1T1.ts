import { Composer } from "grammy";
import type { Ctx } from "../bot.js";

const composer = new Composer<Ctx>();

composer.command("reverse", async (ctx) => {
  const input = (ctx.match ?? "").trim();
  if (!input) {
    await ctx.reply("Usage: /reverse <text>");
    return;
  }
  const reversed = input.split("").reverse().join("");
  await ctx.reply(reversed);
});

export default composer;