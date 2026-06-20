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
  const count = wordCount(input);
  await ctx.reply(`Word count: ${count}`);
});

export default composer;