import { Composer } from "grammy";
import type { Ctx } from "../bot.js";

const composer = new Composer<Ctx>();

composer.command("upper", async (ctx) => {
  const input = (ctx.match ?? "").trim();
  if (!input) {
    await ctx.reply("Usage: /upper <text>");
    return;
  }
  await ctx.reply(input.toUpperCase());
});

export default composer;