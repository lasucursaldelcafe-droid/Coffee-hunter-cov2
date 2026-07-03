#!/usr/bin/env python3
"""Launcher Python para setup-ecosystem.mjs"""
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / "scripts" / "ecosystem" / "setup-ecosystem.mjs"

def main():
    args = ["node", str(SCRIPT)] + sys.argv[1:]
    print("Ecosistema La Sucursal — setup-ecosystem.py")
    subprocess.run(args, cwd=ROOT, check=True)

if __name__ == "__main__":
    main()
