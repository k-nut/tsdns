# TS-DNS 
![Tests](https://github.com/k-nut/tsdns/workflows/Tests/badge.svg)

A DNS resolver written in TypeScript for educational purposes.


## Installation
```
yarn
```

## Running 
```
npx ts-node index.ts <record-type> <domain>
# e.g.
npx ts-node index.ts A www.k-nut.eu
```

## Tests
Unit tests:
```
yarn test    # starts tests in watch mode
yarn test:ci # runs tests once and reports coverage
```

There are also integration tests which run the same query with `dig` and compare the output:
```
./integration-tests.sh
```

## References

[This Primer](https://www2.cs.duke.edu/courses/fall16/compsci356/DNS/DNS-primer.pdf) was very helpful in understanding the DNS package structure.
