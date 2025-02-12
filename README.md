# TS-DNS 
![Tests](https://github.com/k-nut/tsdns/workflows/Tests/badge.svg)

A DNS resolver written in TypeScript for educational purposes.


## Installation
```
npm install
```

## Running 
```
npx tsx src/index.ts <record-type> <domain>
# e.g.
npx tsx src/index.ts A www.k-nut.eu
```

## Tests
```
npm run test             # starts unit tests in watch mode
npm run test:ci          # runs unit tests once and reports coverage
npm run test:integration # runs integrations tests comparing to `dig`
```

## References

[This Primer](https://www2.cs.duke.edu/courses/fall16/compsci356/DNS/DNS-primer.pdf) was very helpful in understanding the DNS package structure.
