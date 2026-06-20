import { Composer } from "grammy";
import type { Ctx } from "../bot.js";

const composer = new Composer<Ctx>();

composer.command("help", async (ctx) => {
  await ctx.reply("Available commands:\n/start — Get started\n/help — Show this help");
});

composer.callbackQuery("help", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("Available commands:\n/start — Get started\n/help — Show this help");
});

export default composer;