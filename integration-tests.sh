#!/bin/sh

echo "🏗  Building"
yarn build

echo "↔️  Comparing"
DIG=$(dig +short A www.k-nut.eu)
TSDNS=$(node dist/index.js A www.k-nut.eu)


if [ "$DIG" = "$TSDNS" ]; then
  echo "✅ A www.k-nut.eu"
else
  echo "❌ A www.k-nut.eu"
  echo "DIG was: $DIG"
  echo "TSDNS was: $TSDNS"
  exit 1
fi

exit 0
