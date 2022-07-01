cargo build-bpf --manifest-path=./program/Cargo.toml --bpf-out-dir=./program/target/solana
solana program deploy ./program/target/solana/simple_counter.so