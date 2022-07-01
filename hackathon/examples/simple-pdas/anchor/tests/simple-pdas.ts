import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SimplePdas } from "../target/types/simple_pdas";

describe("simple-pdas", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SimplePdas as Program<SimplePdas>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
