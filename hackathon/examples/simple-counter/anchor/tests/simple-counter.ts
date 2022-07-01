import * as anchor from "@project-serum/anchor";
import { SimpleCounter } from "../target/types/simple_counter";

describe("simple-counter", () => {
  
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.SimpleCounter as anchor.Program<SimpleCounter>;

  let counterAccount = anchor.web3.Keypair.generate();

  it("Create a counter account to store data.", async () => {
    
    console.log("This will create a new counter account so we can store the counter value.");
    console.log("We'll generate a new keypair for our counter account.");
    console.log(`It's public key will be : ${counterAccount.publicKey}`);

    console.log("\nUsing the IDL created from 'anchor build', we can hit our program's create function.");
    console.log("Anchor does this by creating the necessary instructions to use the 'create' function.");
    console.log("We just have to provide the parameters and associated accounts.");
    await program.methods.create(
      provider.wallet.publicKey
    )
    .accounts({
      counter: counterAccount.publicKey,
      user: provider.wallet.publicKey,
    })
    .signers([counterAccount])
    .rpc();
    
    console.log("\nNow we can query that account's data - also using the IDL created by Anchor:");
    let counterAccountData = await program.account.counter.fetch(counterAccount.publicKey);
    console.log(` Count:  ${counterAccountData.count}`);
    console.log(` Authority:  ${counterAccountData.authority}`);
    console.log("               ^ This should be your wallet's public key.");
  });

  it("Increment the count by 2.", async () => {
    
    console.log("Now we'll use our program to modify the data in the counter account we just created.");
    console.log(`Counter account public key : ${counterAccount.publicKey}`);

    console.log("\nAgain using the IDL from Anchor, we can hit our program's 'increment' function.");
    console.log("This time, because the counter account is owned by our program, we don't need to provide a signer!");
    await program.methods.increment(
      2
    )
    .accounts({
      counter: counterAccount.publicKey,
      authority: provider.wallet.publicKey,
    })
    .rpc();
    
    console.log("\nAgain we can query that account's data:");
    let counterAccountData = await program.account.counter.fetch(counterAccount.publicKey);
    console.log(` Count:  ${counterAccountData.count}`);
    console.log(` Authority:  ${counterAccountData.authority}`);
    console.log("               ^ This should still be your wallet's public key.");
  });
});
