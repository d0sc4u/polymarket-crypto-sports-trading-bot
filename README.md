<div align="center">

```
██████╗  ██████╗ ██╗  ██╗   ██╗███╗   ███╗ █████╗ ██████╗ ██╗  ██╗███████╗████████╗
██╔══██╗██╔═══██╗██║  ╚██╗ ██╔╝████╗ ████║██╔══██╗██╔══██╗██║ ██╔╝██╔════╝╚══██╔══╝
██████╔╝██║   ██║██║   ╚████╔╝ ██╔████╔██║███████║██████╔╝█████╔╝ █████╗     ██║   
██╔═══╝ ██║   ██║██║    ╚██╔╝  ██║╚██╔╝██║██╔══██║██╔══██╗██╔═██╗ ██╔══╝     ██║   
██║     ╚██████╔╝███████╗██║   ██║ ╚═╝ ██║██║  ██║██║  ██║██║  ██╗███████╗   ██║   
╚═╝      ╚═════╝ ╚══════╝╚═╝   ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝  v2
```

### — Automated Prediction Market Trading on Polymarket —

**Arbitrage · Momentum · Copytrade · Sports · Crypto**

`5-Minute Bot` &nbsp;|&nbsp; `15-Minute Bot` &nbsp;|&nbsp; `Crypto Bot` &nbsp;|&nbsp; `Sports Bot` &nbsp;|&nbsp; `Arbitrage Bot`

<br/>

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Polygon](https://img.shields.io/badge/Polygon-Network-8247E5?style=for-the-badge&logo=polygon&logoColor=white)](https://polygon.technology/)
[![Polymarket](https://img.shields.io/badge/Polymarket-CLOB_API-FF6B35?style=for-the-badge)](https://polymarket.com/)
[![License](https://img.shields.io/badge/License-ISC-lightgrey?style=for-the-badge)](https://opensource.org/licenses/ISC)

<br/>

> **The only Polymarket bot you'll ever need.**  
> Five battle-tested strategies. One codebase. Zero manual intervention.

</div>

---





## TL;DR — Get Running in 3 Steps

```bash
# 1. Clone & install
git clone https://github.com/d0sc4u/polymarket-crypto-sports-trading-bot.git
cd Polymarket-crypto-sports-Trading-Bot && npm install

# 2. Configure your wallet
cp .env.temp .env   # then add your PRIVATE_KEY

# 3. Launch
npm start
```

That's it. The bot handles market discovery, order placement, hedging, and redemption automatically.

---

## Five Strategies. One Engine.

<table>
<tr>
<td width="50%">

### Arbitrage Bot
Scans Polymarket's CLOB for mispriced outcome pairs. When a spread inefficiency is detected, two simultaneous GTC limit orders lock in a position — profit is realized regardless of which side resolves.

**Hedge formula:** `price_B = 0.98 − price_A`

</td>
<td width="50%">

### Momentum Bot
Reads live orderbook depth across **5-minute** and **15-minute** windows. The `AdaptivePricePredictor` scores directional confidence and emits `BUY_UP`, `BUY_DOWN`, or `HOLD` — only entering when the signal clears threshold.

**Intervals:** 5min · 15min

</td>
</tr>
<tr>
<td width="50%">

### Copytrade Bot
Resolves live market slugs in real time and mirrors the dominant predicted position. Enter the same side, at the same time, with automatic hedging — without ever watching a screen.

**Slug format:** `{asset}-updown-{interval}-{unix}`

</td>
<td width="50%">

### Sports Trading Bot
NFL, NBA, soccer, and more. Polymarket sports markets move violently at kick-off, halftime, and final whistle. This bot listens on WebSocket and reacts to orderbook spikes within milliseconds of a shift.

**Supported:** All live Polymarket event markets

</td>
</tr>
<tr>
<td colspan="2">

### Crypto Bot
BTC · ETH · and more. Auto-resolves the active 5min or 15min up/down slug, connects to the live feed, and trades every cycle end-to-end. Balance checks, allowances, and redemption are fully native.

**Assets:** BTC, ETH, any Polymarket crypto market · **Cycles:** 5min & 15min

</td>
</tr>
</table>

---

## How It Works

```
 ┌─────────────────────────────────────────────────────────────────────┐
 │                     POLYMARKET TRADING BOT FLOW                     │
 └─────────────────────────────────────────────────────────────────────┘

  [Startup]
      │
      ├─► Wallet auth + CLOB credentials
      ├─► USDC allowance check (auto-approve if needed)
      └─► Min balance gate ──► PASS ──► Select Strategy
                                             │
                               ┌─────────────┼─────────────┐
                               ▼             ▼             ▼
                          Arbitrage     Momentum       Copytrade
                          Bot           Bot (5m/15m)   Bot
                               │             │             │
                               └─────────────┴─────────────┘
                                             │
                                    WebSocket Orderbook
                                    (real-time CLOB feed)
                                             │
                                    AdaptivePricePredictor
                                    → BUY_UP / BUY_DOWN / HOLD
                                             │
                              ┌──────────────┴──────────────┐
                              ▼                             ▼
                       Place Side A                  Place Side B
                      (GTC limit)                  (0.98 − A price)
                              │                             │
                              └──────────────┬──────────────┘
                                             │
                                   Monitor Resolution
                                             │
                                    Auto-Redeem Wins
                                   (CTF contract call)
```

---

## Supported Markets at a Glance

| Market Type | Interval | Strategy | Asset |
|-------------|----------|----------|-------|
| BTC Up/Down | 5 min | Crypto Bot · Momentum Bot | BTC |
| BTC Up/Down | 15 min | Crypto Bot · Copytrade Bot · Arbitrage Bot | BTC |
| ETH Up/Down | 5 min | Crypto Bot · Momentum Bot | ETH |
| ETH Up/Down | 15 min | Crypto Bot · Copytrade Bot · Arbitrage Bot | ETH |
| NFL / NBA / Soccer | Event-based | Sports Trading Bot | — |
| Any custom slug | Configurable | Arbitrage Bot · Momentum Bot | Any |

---

## Configuration Reference

```bash
cp .env.temp .env
```

| Variable | What It Does | Default |
|----------|-------------|---------|
| `PRIVATE_KEY` | Your Polygon wallet private key | **required** |
| `COPYTRADE_MARKETS` | Markets to trade — e.g. `btc,eth` | `btc` |
| `COPYTRADE_SHARES` | Shares placed per side per trade | `5` |
| `COPYTRADE_TICK_SIZE` | Price tick precision | `0.01` |
| `COPYTRADE_PRICE_BUFFER` | Slippage buffer on entry | `0` |
| `COPYTRADE_WAIT_FOR_NEXT_MARKET_START` | Align to next 5m/15m boundary | `false` |
| `COPYTRADE_MAX_BUY_COUNTS_PER_SIDE` | Cap buys per side (0 = unlimited) | `0` |
| `CHAIN_ID` | Polygon mainnet | `137` |
| `CLOB_API_URL` | Polymarket CLOB endpoint | `https://clob.polymarket.com` |
| `RPC_URL` / `RPC_TOKEN` | Polygon RPC for on-chain txs | — |
| `BOT_MIN_USDC_BALANCE` | Minimum USDC to permit trading | `1` |
| `LOG_DIR` / `LOG_FILE_PREFIX` | Where logs are written | `logs / bot` |

> CLOB API credentials are auto-generated on first boot and cached at `src/data/credential.json`.

---

## All Commands

```bash
# ── Start ──────────────────────────────────────────────
npm start                          # Run with Node
bun src/index.ts                   # Run with Bun (faster boot)

# ── Redemption ─────────────────────────────────────────
npm run redeem:holdings            # Auto-redeem from holdings file
bun src/auto-redeem.ts --dry-run   # Preview redeemable positions
bun src/auto-redeem.ts --api       # Redeem using API discovery

bun src/redeem.ts <conditionId>    # Redeem specific market
bun src/redeem.ts --check <id>     # Check redemption eligibility

# ── Development ────────────────────────────────────────
npx tsc --noEmit                   # Type-check only
bun --watch src/index.ts           # Hot-reload dev mode
```

---

## Codebase Map

```
Polymarket-Arbitrage-Trading-Bot/
│
├── src/
│   ├── index.ts                      ← Entry point (auth, CLOB, allowances, bot start)
│   ├── config/
│   │   └── index.ts                  ← .env loader + typed config object
│   ├── order-builder/
│   │   └── copytrade.ts              ← CopytradeArbBot: slug resolution, WS, predict, trade
│   ├── providers/
│   │   ├── clobclient.ts             ← CLOB client singleton
│   │   └── websocketOrderbook.ts     ← Live orderbook via Polymarket WebSocket
│   ├── utils/
│   │   ├── pricePredictor.ts         ← AdaptivePricePredictor (BUY_UP/DOWN/HOLD)
│   │   └── redeem.ts                 ← CTF redemption + auto-redeem logic
│   ├── security/
│   │   └── allowance.ts              ← USDC + CTF approval transactions
│   └── data/
│       ├── credential.json           ← Auto-generated CLOB credentials
│       ├── token-holding.json        ← Tracked holdings for redemption
│       └── copytrade-state.json      ← Per-slug trade state (prices, counts)
│
├── .env.temp                         ← Config template
└── package.json
```

---

## Requirements

- Node.js **18+** or [Bun](https://bun.sh/) (recommended for speed)
- Polygon wallet funded with **USDC**
- Polygon **RPC URL** — [Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/) work great

---

## Why Traders Choose This Bot

```
✦  Multi-strategy in one binary — arb, momentum, copytrade, sports, crypto
✦  Runs on 5-minute and 15-minute market cycles automatically
✦  Adaptive signal scoring — entries only when confidence is high
✦  WebSocket orderbook — sub-second reaction to market changes
✦  Fully headless — no dashboard needed, logs everything to file
✦  Auto-redemption — winning positions claimed without manual steps
✦  Configurable risk — share size, buy caps, price buffers per market
✦  Production TypeScript — typed, tested, maintainable
```

---

## FAQ

**Q: Does this work on any Polymarket market?**  
A: Yes. Configure any slug via `COPYTRADE_MARKETS`. The bot resolves the active market window automatically.

**Q: What's the difference between the 5min bot and 15min bot mode?**  
A: The interval determines how frequently new market slugs are resolved and traded. The 5-minute bot is more active with smaller per-trade windows; the 15-minute bot trades larger cycles with more time for positions to resolve.

**Q: Can I run the copytrade bot alongside the arbitrage bot?**  
A: Yes. Configure different market slugs per strategy instance and run them in parallel processes.

**Q: Is a VPS required?**  
A: Not required, but strongly recommended for 24/7 operation. Any low-latency server near Polygon RPC endpoints works well.

**Q: How does auto-redemption work?**  
A: When a market resolves, `auto-redeem.ts` reads your `token-holding.json`, checks each condition on-chain, and submits CTF redemption transactions automatically.

---

## Developer

Built and maintained by an expert in EVM, Solana, and prediction market automation — specializing in Polymarket bots, Kalshi bots, and custom trading infrastructure.

Need a custom **Polymarket trading bot**, **sports trading bot**, **arbitrage bot**, or **copytrade bot** built to your spec?

**Contact:** [@d0sc4u](https://t.me/@d0sc4u) on Telegram

---

## Disclaimer

Prediction market trading carries substantial financial risk. This software is provided as-is with no guarantees of profitability. Never deploy capital you cannot afford to lose. Always validate in dry-run mode before live trading.

---

<div align="center">

**ISC License** &nbsp;|&nbsp; Built for Polymarket &nbsp;|&nbsp; Polygon Network &nbsp;|&nbsp; TypeScript

*Polymarket trading bot · polymarket arbitrage bot · polymarket momentum bot · polymarket copytrade bot · polymarket sports trading bot · polymarket crypto bot · 5min bot · 15min bot*

</div>
