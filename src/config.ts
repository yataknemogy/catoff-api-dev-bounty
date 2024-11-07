import { PublicKey } from "@solana/web3.js";

export const ONCHAIN_CONFIG = {
    devnet: {
        BackendURL: "https://apiv2.catoff.xyz",
        progId: new PublicKey("CATfsBsU5KLkpug5BzLK3j94Wm7mtCmdss14r4gWdbZz"),
        usdcMintAddress: new PublicKey("usdcjuyqxVrSMiXtn6oDbETAwhJLs6Q5ZxZ2qLqXg9i"),
        bonkMintAddress: new PublicKey("bonkMLw9Gyn4F3dqwxaHgcqLQxvchiYLfjDjEVXCEMf"),
        sendMintAddress: new PublicKey("send5CvJLQjEAASQjXfa1thdnDJkeMxXefZB3AMj1iF"),
        escrowAccountPublicKey: new PublicKey("CATcfUQ5wvdVFEWmky6jRoKKvCL6F4tvhXqTYQJ93eix"),
        escrowUSDCTokenAccount: new PublicKey("uk9HVP7WrFYeyQpjE3g6oJt94WT9zdaRZiG8B94m1Tk"),
        nodeURL: "https://api.devnet.solana.com",
        partnerApiKey: process.env.PARTNER_API_KEY_DEVNET,
        Decimals: {
            SOL: 9,
            USDC: 6,
            BONK: 5,
            SEND: 6,
        },
    },
    mainnet: {
        BackendURL: "https://mainnet-apiv2.catoff.xyz",
        progId: new PublicKey("CATmfh29bJtF82sXykY4mGB2UWBPB8gVmHn6pX3azLCr"),
        usdcMintAddress: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
        bonkMintAddress: new PublicKey("DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"),
        sendMintAddress: new PublicKey("SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa"),
        escrowAccountPublicKey: new PublicKey("CATLzD3jRQyu6ifCpybnadt7MoHffJkFL6WtqGzjPAUC"),
        escrowUSDCTokenAccount: new PublicKey("57ADTUqMdJHDJJ9HW6CWY3CcYvBUWc11VTmsyBpRoPCZ"),
        nodeURL: process.env.RPC_URL,
        partnerApiKey: process.env.PARTNER_API_KEY_MAINNET,
        Decimals: {
            SOL: 9,
            USDC: 6,
            BONK: 5,
            SEND: 6,
        },
    },
};