#!/bin/sh

DIG=$(dig +short A www.k-nut.eu)
TSDNS=$(npx ts-node index.ts A www.k-nut.eu)


if [ "$DIG" = "$TSDNS" ]; then
  echo "✅ A www.k-nut.eu"
else
  echo "❌ A www.k-nut.eu"
  echo "DIG was: $(DIG)"
  echo "TSDNS was: $(TSNDS)"
  exit 1
fi

exit 0
