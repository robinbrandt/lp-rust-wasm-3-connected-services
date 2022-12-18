# Compose multiple wasm microservices together

## Build

```bash
cd sales_tax_rate
cargo build --target wasm32-wasi --release

cd order_total
cargo build --target wasm32-wasi --release
```

## Run

```bash
cd sales_tax_rate
wasmedge target/wasm32-wasi/release/sales_tax_rate_lookup.wasm

cd order_total
wasmedge --env "SALES_TAX_RATE_SERVICE=http://127.0.0.1:8001/find_rate" target/wasm32-wasi/release/order_total.wasm
```

## Test

Run the following from another terminal.

```bash
$ curl http://localhost:8002/compute -X POST -d @order.json
{
  "order_id": 123,
  "product_id": 321,
  "quantity": 2,
  "subtotal": 20.0,
  "shipping_address": "123 Main St, Anytown USA",
  "shipping_zip": "78701",
  "total": 21.65
}
```
