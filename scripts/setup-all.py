#!/usr/bin/env python3
"""
Colombia Green Coffee — setup:all (Python launcher)

Reads .env.local and runs the Node orchestrator.
Cross-platform: Windows, macOS, Linux.

Usage:
  python scripts/setup-all.py
  py scripts/setup-all.py
"""
from __future__ import annotations

import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def which(cmd: str) -> bool:
    return shutil.which(cmd) is not None


def load_env_local() -> dict[str, str]:
    env_path = ROOT / ".env.local"
    if not env_path.exists():
        return {}
    env: dict[str, str] = {}
    for line in env_path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if "=" not in line:
            continue
        key, _, value = line.partition("=")
        env[key.strip()] = value.strip().strip('"').strip("'")
    return env


def run(cmd: list[str], *, cwd: Path | None = None) -> None:
    print(f"$ {' '.join(cmd)}")
    subprocess.run(cmd, cwd=cwd or ROOT, check=True)


def main() -> int:
    print("=" * 60)
    print("Colombia Green Coffee — setup:all (Python)")
    print(f"Root: {ROOT}")
    print("=" * 60)

    for cmd in ("node", "npm"):
        if not which(cmd):
            print(f"ERROR: {cmd} not found. Install Node.js first.", file=sys.stderr)
            return 1

    env_local = ROOT / ".env.local"
    if not env_local.exists():
        print("Creating .env.local...")
        run(["npm", "run", "setup"])

    env = load_env_local()
    if not env.get("VERCEL_TOKEN"):
        print(
            "ERROR: VERCEL_TOKEN missing in .env.local\n"
            "Add it from https://vercel.com/account/tokens",
            file=sys.stderr,
        )
        return 1

    if not (ROOT / "node_modules").exists():
        run(["npm", "ci"])

    run(["node", "scripts/setup-all.mjs"])
    return 0


if __name__ == "__main__":
    sys.exit(main())
