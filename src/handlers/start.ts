import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { menuKeyboard } from "../toolkit/index.js";

const composer = new Composer<Ctx>();

composer.command("start", async (ctx) => {
  const keyboard = menuKeyboard([
    { text: "Help", data: "help" },
  ], 2);

  await ctx.reply("Welcome! I am ready to help.\n\nWhat would you like to do?", {
    reply_markup: keyboard,
  });
});

export default composer;
