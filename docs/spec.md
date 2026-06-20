## Summary
TextToolsBot — a small, stateless Telegram text-utility bot implemented in TypeScript using grammY. It offers simple one-shot text transforms (reverse, upper, lower) and text statistics (word & character count). No database, storage, auth, or payments.

## Audience
Telegram users who want quick, single-message text transforms or counts via bot commands.

## Core entities
- Command: one of /start, /help, /reverse, /upper, /lower, /count
- Incoming message: Telegram Message containing a command and optional argument text
- Handler module: per-command TypeScript module under src/handlers that processes the command and replies

## Integrations & notification targets
- Telegram Bot API via grammY. Bot token provided via environment variable (TELEGRAM_BOT_TOKEN).
- No external APIs, databases, or notification endpoints.

## Interaction flows
All commands are stateless and operate only on the message text provided with the command.

1) /start
- User: /start
- Bot: welcomes user and lists available commands and short usage examples.

2) /help
- User: /help
- Bot: replies with the same command list and usage hints.

3) /reverse <text>
- User: /reverse Hello world
- Bot: replies with the text reversed: "dlrow olleH"
- If no text provided: bot replies asking for text and shows usage: "/reverse <text>"

4) /upper <text>
- User: /upper Hello
- Bot: replies "HELLO"
- If no text provided: ask for text with usage example.

5) /lower <text>
- User: /lower Hello
- Bot: replies "hello"
- If no text provided: ask for text with usage example.

6) /count <text>
- User: /count Hello world!
- Bot: replies with two numbers: word count and character count (characters include all characters, including spaces and punctuation). Example reply: "Words: 2\nCharacters (including spaces): 12"
- If no text provided: ask for text with usage example.

Notes on input handling
- The bot parses the message.text for the command and treats the remainder (trimmed) as the command argument. It does not store state and does not accept files or inline queries.
- If the user sends a command by replying to another message (i.e., not providing inline argument), the bot will NOT automatically use the replied-to message as input (to keep the interaction simple and stateless). The user must provide text as an argument.

## Command behavior specifics
- Whitespace handling: leading/trailing whitespace in the argument is trimmed. Multiple internal whitespace characters are preserved for transform commands; for word counting they are used to split words (split on Unicode whitespace and ignore empty tokens).
- Word count definition: number of non-empty tokens after splitting on Unicode whitespace.
- Character count definition: total number of UTF-16 code units in the argument string (i.e., length property), which corresponds to JavaScript string length and counts spaces and punctuation. This is simple and predictable for this utility tool.

## Implementation details
- Language: TypeScript
- Framework: grammY
- Project layout (minimum):
  - package.json, tsconfig.json
  - src/index.ts — bot bootstrap, command registration (setMyCommands), wiring handlers
  - src/handlers/start.ts
  - src/handlers/help.ts
  - src/handlers/reverse.ts
  - src/handlers/upper.ts
  - src/handlers/lower.ts
  - src/handlers/count.ts
  - src/utils.ts — shared small helpers (e.g., wordCount function)
- Handler module contract: each handler exports a default async function handle(ctx: Context): Promise<void> (or default export that is the handler function). index.ts imports and registers them with bot.command('reverse', reverseHandler).
- Environment: BOT token read from process.env.TELEGRAM_BOT_TOKEN. Use dotenv for local development (optional).
- Commands: register via bot.api.setMyCommands with descriptions for each command.
- Logging: minimal console logging for start and unhandled errors.
- Errors: handler should catch and reply with a short generic error message (e.g., "Sorry, an error occurred.") but no stack traces to users.

## Persistence
- None. The bot is stateless; no database, no file storage, no session storage.

## Payments
- None.

## Non-goals
- No message threading or conversation state.
- No inline queries or command/button UIs beyond basic reply messages.
- No file uploads/attachments support.
- No multi-language support beyond English.

## Assumptions & defaults
- BOT token environment variable: TELEGRAM_BOT_TOKEN — standard and secure way to supply token.
  Rationale: simplest env-based configuration for deployment.
- Handlers export default async function handle(ctx: Context): Promise<void> and are imported by src/index.ts.
  Rationale: consistent handler shape and easy wiring to grammY command registration.
- If a command is issued without text, reply with a short usage hint like: "Please provide text. Usage: /reverse <text>".
  Rationale: clear and immediate guidance to users; keeps bot stateless.
- Word count: split on Unicode whitespace and count non-empty tokens.
  Rationale: predictable and commonly expected definition.
- Character count: use JavaScript string length (includes spaces & punctuation).
  Rationale: simple and transparent implementation; matches many user expectations.
- Do not use replied-to messages as command input by default; argument must follow the command.
  Rationale: keeps parsing simple and avoids ambiguity in a stateless bot.
- Register commands (setMyCommands) with short descriptions at startup.
  Rationale: improves UX in Telegram's command UI.

