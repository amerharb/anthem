#!/usr/bin/env bash
#
# Split a country's full anthem into a drum intro + the instrument part.
#
#   Usage:  scripts/split-anthem.sh <code> <intro-seconds> [source.aac]
#   e.g.    scripts/split-anthem.sh iq 4.3
#
# The source defaults to public/sound/introInstrument/<code>.aac — the full,
# seamless recording (intro + instrument in one take), which stays the master.
# The script writes the two derived files:
#
#   public/sound/intro/<code>.aac        the first <intro-seconds> seconds
#   public/sound/instrument/<code>.aac   the rest
#
# Output format matches the rest of the app: AAC, 44.1 kHz, mono, ~100 kbps.
# Needs ffmpeg (brew install ffmpeg).
set -euo pipefail

code="${1:?usage: split-anthem.sh <code> <intro-seconds> [source.aac]}"
split="${2:?usage: split-anthem.sh <code> <intro-seconds> [source.aac]}"
root="$(cd "$(dirname "$0")/.." && pwd)"
src="${3:-$root/public/sound/introInstrument/$code.aac}"
intro="$root/public/sound/intro/$code.aac"
inst="$root/public/sound/instrument/$code.aac"

[ -f "$src" ] || { echo "source not found: $src" >&2; exit 1; }
mkdir -p "$root/public/sound/intro" "$root/public/sound/instrument"

# first <split> seconds -> intro ; from <split> to end -> instrument
ffmpeg -y -loglevel error -i "$src" -t  "$split" -ac 1 -ar 44100 -c:a aac -b:a 100k "$intro"
ffmpeg -y -loglevel error -i "$src" -ss "$split" -ac 1 -ar 44100 -c:a aac -b:a 100k "$inst"

dur() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }
echo "source:     $src ($(dur "$src")s)"
echo "intro:      $intro ($(dur "$intro")s)"
echo "instrument: $inst ($(dur "$inst")s)"
