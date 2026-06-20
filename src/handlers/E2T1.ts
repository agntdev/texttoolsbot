import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { wordCount } from "../utils.js";

const composer = new Composer<Ctx>();

composer.command("count", async (ctx) => {
  const input = (ctx.match ?? "").trim();
  if (!input) {
    await ctx.reply("Usage: /count <text>");
    return;
  }
  const words = wordCount(input);
  const chars = input.length;
  await ctx.reply(`Words: ${words}, Characters: ${chars}`);
});

export default composer;