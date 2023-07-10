#!/bin/sh

echo "↔️  Comparing"
DIG=$(dig +short A www.k-nut.eu)
TSDNS=$(npx tsx src/index.ts A www.k-nut.eu)


if [ "$DIG" = "$TSDNS" ]; then
  echo "✅ A www.k-nut.eu"
else
  echo "❌ A www.k-nut.eu"
  echo "DIG was: $DIG"
  echo "TSDNS was: $TSDNS"
  exit 1
fi

exit 0
