import { Wallet } from "@ethersproject/wallet";
import { config } from "../config";
import { logger } from "console-loggers";

/**
 * Validates that PRIVATE_KEY is set and is a valid Ethereum private key.
 * If invalid: logs the error and exits the process with code 1.
 */
export function validatePrivateKey(): void {
    const privateKey = config.privateKey;
    if (!privateKey || !privateKey.trim()) {
        logger.error("PRIVATE_KEY is missing or empty. Set PRIVATE_KEY in your .env file.");
        console.log("PRIVATE_KEY is missing or empty. Set PRIVATE_KEY in your .env file.");
        process.exit(1);
    }

    const trimmed = privateKey.trim();
    try {
        new Wallet(trimmed);
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        // logger.error("Invalid PRIVATE_KEY:", msg);
        console.log("Invalid PRIVATE_KEY:", msg);
        console.log(
            "Private key must be a valid 32-byte hex string (64 hex characters, optionally prefixed with 0x)."
        );
        process.exit(1);
    }
}
