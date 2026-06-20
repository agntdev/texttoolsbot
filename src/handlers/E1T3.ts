import { Composer } from "grammy";
import type { Ctx } from "../bot.js";

const composer = new Composer<Ctx>();

composer.command("lower", async (ctx) => {
  const input = (ctx.match ?? "").trim();
  if (!input) {
    await ctx.reply("Usage: /lower <text>");
    return;
  }
  await ctx.reply(input.toLowerCase());
});

export default composer;